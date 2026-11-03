(() => {
  'use strict';
  const dialog = document.querySelector('#detail-dialog');
  const content = document.querySelector('#panel-content');
  const holder = document.querySelector('#scene-holder');
  const hint = document.querySelector('#room-hint');
  const defaultHint = '<span class="hint-star" aria-hidden="true">·</span> Three corners, three ways of thinking.<br>Choose one to step inside.';
  let returnFocus = null;
  let particleRoom = null;
  let currentJourney = null;
  let travelling = false;
  const collectionKeys = new Set(['neuro', 'serious', 'fun']);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const validPanels = new Set(['neuro','serious','fun','about','contact']);
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const external = (url) => /^https:\/\//.test(url);
  const setRoomInert = value => document.querySelectorAll('.topbar, #main, .site-footer, .skip-link').forEach(node => { node.inert = value; });

  function projectMarkup(project) {
    return `<article class="project"><div class="project-heading"><h3>${escape(project.title)}</h3><span class="project-year">${escape(project.year)}</span></div><p class="project-context">${escape(project.context)}</p><p class="project-description">${escape(project.description)}</p>${project.details ? `<ul>${project.details.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>` : ''}<p class="project-tools">${escape(project.tools)}</p>${project.links ? `<div class="project-actions">${project.links.filter(link=>external(link.url)).map(link=>`<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">${escape(link.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}</article>`;
  }

  function toolMarkup(slugs) {
    return `<div class="tool-list">${slugs.map(([slug,name])=>`<img src="./assets/tools/${slug}.svg" alt="${escape(name)}" height="22" loading="lazy" />`).join('')}</div>`;
  }

  function aboutMarkup() {
    return `<p class="panel-kicker">A little about me</p><h2 id="panel-title" tabindex="-1">Hi! I’m Lancelot.</h2><p class="about-body">I’m an MSc Data Science student at ETH Zurich, with a minor in Neural Information Processing. I’m interested in how brains learn, how we can make sense of neural data, and what we can build along the way.</p><p class="about-body">Outside of code, there’s usually a badminton racket, a piano, or a chessboard somewhere nearby. This room is a little collection of those different sides of me.</p><h3 class="section-title">Where I’ve been learning</h3><ol class="timeline"><li><strong>ETH Zurich · MSc Data Science</strong><span class="dates">2025–2028 · In progress</span><p>Minor in Neural Information Processing.</p></li><li><strong>EPFL · BSc Computer Science</strong><span class="dates">2022–2025</span><p>Including a computer science exchange at the University of Sydney.</p></li></ol><h3 class="section-title">Experience</h3><ol class="timeline"><li><strong>Institute of Neuroinformatics</strong><span class="dates">Research intern · February–July 2026</span><p>Neural spike data, spiking representations, and temporal decoding.</p></li><li><strong>University of Sydney</strong><span class="dates">Research intern, signal analysis · 2024–2025</span><p>Signal-processing pipelines, time-resolved classifiers, and representational similarity analysis.</p></li><li><strong>EPFL</strong><span class="dates">Teaching assistant · 2023–2024</span><p>First-year sessions in linear algebra and information, computation, and communication.</p></li></ol><h3 class="section-title">Tools I work with</h3>${toolMarkup([['python','Python'],['numpy','NumPy'],['pandas','Pandas'],['c','C'],['java','Java'],['scala','Scala'],['sql','SQL'],['julia','Julia']])}${toolMarkup([['pytorch','PyTorch'],['sklearn','Sklearn'],['pynest','PyNEST']])}`;
  }

  function contactMarkup() {
    return `<p class="panel-kicker">The door is open</p><h2 id="panel-title" tabindex="-1">Say hello.</h2><p class="contact-lead">I’m looking for opportunities where data science and my interest in the brain can come together. If that sounds like something you’re working on, I’d love to hear about it.</p><div class="contact-links"><a class="contact-link" href="mailto:lancelotcharvillat@gmail.com"><span class="contact-type">Email</span><span class="contact-value">lancelotcharvillat@gmail.com</span><span class="contact-arrow" aria-hidden="true">↗</span></a><a class="contact-link" href="https://linkedin.com/in/lancelot-charvillat-67519a277" target="_blank" rel="noopener noreferrer"><span class="contact-type">LinkedIn</span><span class="contact-value">Lancelot Charvillat</span><span class="contact-arrow" aria-hidden="true">↗</span></a><a class="contact-link" href="https://github.com/lacha25" target="_blank" rel="noopener noreferrer"><span class="contact-type">GitHub</span><span class="contact-value">@lacha25</span><span class="contact-arrow" aria-hidden="true">↗</span></a></div><p class="contact-location">Based in Zurich, Switzerland.</p>`;
  }


  async function enterPortal(key) {
    travelling = true;
    currentJourney = key;
    setRoomInert(true);
    document.body.classList.add('is-travelling', 'inside-project');
    try { if (particleRoom) await particleRoom.enter(key); }
    finally { travelling = false; document.body.classList.remove('is-travelling'); }
  }

  async function openPanel(key, trigger, updateUrl = true) {
    if (!validPanels.has(key) || travelling) return;
    if (!dialog.open) returnFocus = trigger || document.activeElement;
    if (!dialog.open && collectionKeys.has(key)) {
      document.body.style.overflow = 'hidden';
      try { await enterPortal(key); } catch { /* Keep project links usable if the canvas is unavailable. */ }
    }
    dialog.classList.toggle('immersive', collectionKeys.has(key) || !!currentJourney);
    dialog.dataset.collection = collectionKeys.has(key) ? key : (currentJourney || '');
    dialog.style.setProperty('--accent', window.PORTFOLIO[key]?.accent || '#b8bed1');
    if (key === 'about') content.innerHTML = aboutMarkup();
    else if (key === 'contact') content.innerHTML = contactMarkup();
    else {
      const collection = window.PORTFOLIO[key];
      const places = {serious:'Inside the laptop',fun:'Through the window',neuro:'Inside the mind'};
      content.innerHTML = `<div class="collection-intro"><span class="inside-note">${places[key]}</span><p class="panel-kicker">${escape(collection.kicker)}</p><h2 id="panel-title" tabindex="-1">${escape(collection.title)}<span aria-hidden="true">.</span></h2><p class="panel-intro">${escape(collection.intro)}</p></div><div class="project-grid">${collection.projects.map(projectMarkup).join('')}</div>`;
    }
    document.querySelector('.panel-footer').hidden = key === 'contact';
    if (!dialog.open) dialog.showModal();
    setRoomInert(false);
    document.body.style.overflow = 'hidden';
    dialog.scrollTop = 0;
    content.querySelector('#panel-title').focus({preventScroll:true});
    if (updateUrl) history.replaceState(null, '', `#${key}`);
  }

  async function closePanel() {
    if (!dialog.open || travelling) return;
    travelling = true;
    setRoomInert(true);
    if (currentJourney && !reducedMotion.matches) {
      await dialog.animate([{opacity:1},{opacity:0}],{duration:180,easing:'ease-out'}).finished.catch(()=>{});
    }
    dialog.close();
    if (currentJourney) {
      document.body.classList.add('is-travelling');
      try { if (particleRoom) await particleRoom.leave(); } catch { /* The room remains navigable after a rendering failure. */ }
      currentJourney = null;
    }
    travelling = false;
    setRoomInert(false);
    document.body.classList.remove('is-travelling', 'inside-project');
    document.body.style.overflow = '';
    history.replaceState(null, '', location.pathname + location.search);
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true});
  }
  dialog.addEventListener('cancel', event => { event.preventDefault(); closePanel(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePanel();
  });
  document.querySelector('#close-panel').addEventListener('click', closePanel);
  document.querySelector('#back-room').addEventListener('click', closePanel);
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-open]');
    if (button) openPanel(button.dataset.open, button);
  });
  const hints = {neuro:'Neuroscience — enter the mind.',serious:'Serious projects — enter the laptop.',fun:'Just for fun — step through the window.'};
  function highlight(key) {
    particleRoom?.setHover(key);
    if (key) hint.textContent = hints[key];
    else hint.innerHTML = defaultHint;
  }
  document.querySelectorAll('.collection-link').forEach(button => {
    button.addEventListener('mouseenter',()=>highlight(button.dataset.open));
    button.addEventListener('mouseleave',()=>highlight(null));
    button.addEventListener('focus',()=>highlight(button.dataset.open));
    button.addEventListener('blur',()=>highlight(null));
  });
  holder.addEventListener('pointerover', event => {
    const zone = event.target.closest('[data-zone]');
    if (zone) highlight(zone.dataset.zone);
  });
  holder.addEventListener('pointerout', event => {
    if (!event.target.closest('[data-zone]')?.contains(event.relatedTarget)) highlight(null);
  });
  holder.addEventListener('focusin', event => {
    const zone = event.target.closest('[data-zone]');
    if (zone) highlight(zone.dataset.zone);
  });
  holder.addEventListener('focusout',()=>highlight(null));
  try {
    holder.replaceChildren();
    particleRoom = window.createParticleRoom(holder, {onSelect:(key,trigger)=>openPanel(key,trigger)});
  } catch {
    holder.innerHTML = '<p class="scene-loading">Explore the three collections using the links below.</p>';
  }
  hint.innerHTML = defaultHint;
  function syncHash() {
    const key = location.hash.slice(1);
    if (validPanels.has(key)) openPanel(key, null, false);
    else closePanel();
  }
  window.addEventListener('hashchange', syncHash);
  if (location.hash) syncHash();
})();
