(() => {
  'use strict';
  const dialog = document.querySelector('#detail-dialog');
  const content = document.querySelector('#panel-content');
  const holder = document.querySelector('#scene-holder');
  const backButton = document.querySelector('#back-room');
  const homeLink = document.querySelector('.home-link');
  const collectionKeys = new Set(['neuro', 'serious', 'fun']);
  const panels = new Set([...collectionKeys, 'about', 'contact']);
  const homeSurfaces = [...document.querySelectorAll('.topbar, #main, .skip-link')].filter(node => !node.contains(dialog));
  const baseUrl = location.pathname + location.search;
  const session = Math.random().toString(36).slice(2);
  const originalOverflow = document.body.style.overflow;
  const originalTitle = document.title;
  let room = null;
  let currentPanel = null;
  let journey = null;
  let desiredPanel = readHash();
  let processing = false;
  let travelling = false;
  let returnFocus = null;
  let pendingNavigation = null;
  let closingViaHistory = false;

  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  function readHash() { const key = location.hash.slice(1); return panels.has(key) ? key : null; }
  function fallbackFocus(key) { return (collectionKeys.has(key) && document.querySelector(`.collection-link[href="#${key}"]`)) || homeLink; }
  function rememberFocus(trigger, key) {
    if (returnFocus || currentPanel || journey || travelling) return;
    const candidate = trigger || document.activeElement;
    returnFocus = candidate && candidate !== document.body && !dialog.contains(candidate) ? candidate : fallbackFocus(key);
  }
  function syncUi() {
    document.body.classList.toggle('panel-open', dialog.open);
    document.body.classList.toggle('is-travelling', travelling);
    document.body.style.overflow = dialog.open || travelling ? 'hidden' : originalOverflow;
    const panelTitle = content.querySelector('#panel-title')?.textContent;
    document.title = dialog.open && panelTitle ? `${panelTitle} · ${originalTitle}` : originalTitle;
    homeSurfaces.forEach(node => { node.inert = travelling && !dialog.open; });
  }
  function restoreFocus() {
    const target = returnFocus?.isConnected ? returnFocus : homeLink;
    returnFocus = null;
    target?.focus({preventScroll: true});
  }

  function projectMarkup(project) {
    const links = (project.links || []).filter(link => /^https:\/\//.test(link.url));
    return `<article class="project"><div class="project-heading"><h3>${escape(project.title)}</h3>${project.year ? `<span class="project-year">${escape(project.year)}</span>` : ''}</div>${project.context ? `<p class="project-context">${escape(project.context)}</p>` : ''}<p class="project-description">${escape(project.description)}</p>${project.details?.length ? `<ul>${project.details.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}${project.tools ? `<p class="project-tools">${escape(project.tools)}</p>` : ''}${links.length ? `<div class="project-actions">${links.map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(`${link.label} — ${project.title} (opens in a new tab)`)}">${escape(link.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}</article>`;
  }
  function toolsMarkup(tools) {
    return `<div class="tool-list">${tools.map(([slug, name]) => `<img src="./assets/tools/${slug}.svg" alt="${escape(name)}" height="22" loading="lazy">`).join('')}</div>`;
  }
  function aboutMarkup() {
    return `<h2 id="panel-title" tabindex="-1">About</h2><p class="about-body">I’m Lancelot, an MSc Data Science student at ETH Zurich with a minor in Neural Information Processing. My interests include how brains learn, neural data and neurotechnology.</p><p class="about-body">Outside of work, I play badminton, piano and chess.</p><h3 class="section-title">Education</h3><ol class="timeline"><li><strong>ETH Zurich · MSc Data Science</strong><span class="dates">2025–2028 · In progress</span><p>Minor in Neural Information Processing.</p></li><li><strong>EPFL · BSc Computer Science</strong><span class="dates">2022–2025</span><p>Exchange at the University of Sydney.</p></li></ol><h3 class="section-title">Experience</h3><ol class="timeline"><li><strong>Institute of Neuroinformatics</strong><span class="dates">Research intern · February–July 2026</span><p>Neural spike data, spiking representations and temporal decoding.</p></li><li><strong>University of Sydney</strong><span class="dates">Research intern, signal analysis · 2024–2025</span><p>Signal-processing pipelines, time-resolved classifiers and representational similarity analysis.</p></li><li><strong>EPFL</strong><span class="dates">Teaching assistant · 2023–2024</span><p>First-year sessions in linear algebra and information, computation and communication.</p></li></ol><h3 class="section-title">Tools</h3>${toolsMarkup([['python','Python'],['numpy','NumPy'],['pandas','Pandas'],['c','C'],['java','Java'],['scala','Scala'],['sql','SQL'],['julia','Julia'],['pytorch','PyTorch'],['sklearn','Sklearn'],['pynest','PyNEST']])}`;
  }
  function contactMarkup() {
    return `<h2 id="panel-title" tabindex="-1">Contact</h2><p class="contact-lead">I’m looking for roles combining data science and neuroscience.</p><div class="contact-links"><a class="contact-link" href="mailto:lancelotcharvillat@gmail.com">lancelotcharvillat@gmail.com<span aria-hidden="true">↗</span></a><a class="contact-link" href="https://linkedin.com/in/lancelot-charvillat-67519a277" target="_blank" rel="noopener noreferrer">LinkedIn<span aria-hidden="true">↗</span></a><a class="contact-link" href="https://github.com/lacha25" target="_blank" rel="noopener noreferrer">GitHub<span aria-hidden="true">↗</span></a></div>`;
  }
  function renderPanel(key) {
    dialog.dataset.panel = key;
    if (key === 'about') content.innerHTML = aboutMarkup();
    else if (key === 'contact') content.innerHTML = contactMarkup();
    else {
      const collection = window.PORTFOLIO[key];
      content.innerHTML = `<h2 id="panel-title" tabindex="-1">${escape(collection.title)}</h2><div class="project-grid">${collection.projects.map(projectMarkup).join('')}</div>`;
    }
    dialog.showModal();
    currentPanel = key;
    room?.setPaused?.(true);
    travelling = false;
    syncUi();
    dialog.scrollTop = 0;
    content.querySelector('#panel-title').focus({preventScroll: true});
  }
  async function fly(key) {
    if (!room) return;
    room.setPaused?.(false);
    travelling = true;
    syncUi();
    try { await (key ? room.enter(key) : room.leave()); }
    catch { /* Navigation remains available if rendering fails. */ }
  }
  async function reconcile() {
    if (processing) return;
    processing = true;
    try {
      while (true) {
        const target = desiredPanel;
        if (target === currentPanel && (!journey || journey === target)) break;
        if (target) rememberFocus(null, target);
        if (dialog.open) {
          room?.setPaused?.(false);
          dialog.close();
          currentPanel = null;
          syncUi();
        }
        if (journey && journey !== target) {
          await fly(null);
          journey = null;
          if (desiredPanel !== target) continue;
        }
        if (!target) {
          travelling = false;
          syncUi();
          restoreFocus();
          break;
        }
        if (collectionKeys.has(target) && room && journey !== target) {
          await fly(target);
          journey = target;
          if (desiredPanel !== target) continue;
        }
        renderPanel(target);
        if (desiredPanel === target) break;
      }
    } catch (error) {
      console.error('Could not open the portfolio panel.', error);
      room?.setPaused?.(false);
      if (dialog.open) dialog.close();
      currentPanel = null;
      if (journey) await fly(null);
      journey = null;
      desiredPanel = null;
      history.replaceState(null, '', baseUrl);
      travelling = false;
      syncUi();
      restoreFocus();
    } finally {
      processing = false;
      travelling = false;
      syncUi();
      if (desiredPanel !== currentPanel) reconcile();
    }
  }
  function route() { desiredPanel = readHash(); reconcile(); }
  function openFromScene(key, trigger) {
    if (!panels.has(key)) return;
    rememberFocus(trigger, key);
    pendingNavigation = {key, fromRoom: !readHash()};
    if (readHash() === key) route();
    else location.hash = key;
  }
  function backToRoom() {
    if (closingViaHistory) return;
    const marker = history.state?.portfolio;
    if (readHash() && marker?.session === session && marker.fromRoom) {
      closingViaHistory = true;
      history.back();
    } else {
      history.replaceState(null, '', baseUrl);
      route();
    }
  }

  // Native links own the URL. Record only the origin needed for focus and Back.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const key = link.getAttribute('href').slice(1);
    if (!panels.has(key)) return;
    rememberFocus(link, key);
    pendingNavigation = {key, fromRoom: !readHash()};
    if (readHash() === key) route();
  });
  window.addEventListener('hashchange', () => {
    closingViaHistory = false;
    const key = readHash();
    if (pendingNavigation?.key === key) {
      const state = history.state && typeof history.state === 'object' ? history.state : {};
      history.replaceState({...state, portfolio: {session, fromRoom: pendingNavigation.fromRoom}}, '', location.href);
    }
    pendingNavigation = null;
    route();
  });
  backButton.addEventListener('click', backToRoom);
  dialog.addEventListener('cancel', event => { event.preventDefault(); backToRoom(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && travelling) { event.preventDefault(); backToRoom(); }
  });
  document.querySelectorAll('.collection-link').forEach(link => {
    const key = link.getAttribute('href').slice(1);
    link.addEventListener('mouseenter', () => room?.setHover(key));
    link.addEventListener('mouseleave', () => room?.setHover(null));
    link.addEventListener('focus', () => room?.setHover(key));
    link.addEventListener('blur', () => room?.setHover(null));
  });
  try { room = window.createParticleRoom(holder, {onSelect: openFromScene}); }
  catch { /* The native collection links remain available without the canvas. */ }
  route();
})();
