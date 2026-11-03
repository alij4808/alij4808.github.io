window.PORTFOLIO = {
  neuro: {
    title: 'The curious mind', kicker: '01 / Neuroscience', accent: '#d3aec9',
    intro: 'How do brains learn, represent information, and turn it into action? This is the corner I keep coming back to.',
    projects: [
      {title:'Neural decoding & spiking representations',year:'2026',context:'Research internship · Institute of Neuroinformatics',description:'Worked with high-dimensional neural spike data from a primate grasping dataset to decode continuous movement.',details:['Benchmarked temporal decoders for continuous kinematics.','Evaluated a spiking autoencoder trained with Differentiated Target Propagation against PCA and raw features.'],tools:'Neural data · Spiking autoencoders · Temporal decoding'},
      {title:'Generative EEG embeddings',year:'2026',context:'Research project · ETH Zurich',description:'Used model parameters to study muscarinic neuromodulation of the mismatch-negativity circuit.',details:['Applied Bayesian dynamic causal modelling to EEG event-related potentials.','Used the inferred parameters to build an individual-level classifier.'],tools:'EEG · Dynamic causal modelling · Bayesian inference'},
      {title:'Brain Explorer',year:'2026',context:'An interactive field guide to the brain',description:'A 3D atlas connecting brain anatomy with region functions, learning mechanisms, and linked scientific literature. A way to explore the questions, rather than just read about them.',tools:'JavaScript · Three.js · Scientific visualization',links:[{label:'Explore the atlas',url:'https://lacha25.github.io/brain-explorer/'},{label:'Source code',url:'https://github.com/lacha25/brain-explorer'}]}
    ]
  },
  serious: {
    title: 'The focused side', kicker: '02 / Serious projects', accent: '#b9dbd6',
    intro: 'Machine learning experiments, research tools, and systems built to work through a concrete problem.',
    projects: [
      {title:'AI Scientist Harness & Benchmark',year:'2026 · ongoing',context:'ETH Zurich',description:'Developing an agent harness for the mechanical engineering department, with an exam-based evaluation pipeline.',tools:'AI agents · Evaluation · Research tooling'},
      {title:'Gipfelsturm LLM Training Challenge',year:'2026',context:'ETH Zurich · CSCS',description:'Explored the trade-offs of training 125M–8B parameter models with Megatron-LM under a 30-minute compute budget.',details:['Compared microbatch sizes, numerical precision, dataloader workers, and gradient checkpointing.','Used Chinchilla scaling laws to reason about compute allocation.'],tools:'Megatron-LM · Distributed training · Benchmarking'},
      {title:'Alpine Guard',year:'2025',context:'A team prototype · Swiss AI Hackathon',description:'Exploring Swiss glaciers and estimating risk. I contributed to the Python backend and machine learning risk-model pipeline.',tools:'Python · FastAPI · scikit-learn · Geospatial data',links:[{label:'View the project',url:'https://github.com/eliemada/swiss-ai-hackathon-25'}]},
      {title:'Fashion-MNIST classification',year:'2024',context:'EPFL · 2nd out of 133',description:'Compared CNNs, multilayer perceptrons, and Vision Transformers with data augmentation and architecture and optimizer sweeps.',tools:'Deep learning · Image classification · Model selection'}
    ]
  },
  fun: {
    title: 'The playful side', kicker: '03 / Just for fun', accent: '#beb9e7',
    intro: 'A few things that started outside the lecture hall: nights out, running for a connection, and watching planes go by.',
    projects: [
      {title:'PubCrawl — Crawl App',year:'2024',context:'A team hackathon build',description:'A mobile app for planning a pub crawl, with an interactive map and directions between stops. I contributed to the map and route interface.',tools:'TypeScript · React Native · Expo',links:[{label:'View the project',url:'https://github.com/Crawl-App/app-frontend'}]},
      {title:'RunMap',year:'2026',context:'What if you ran between connections?',description:'A transit planner that compares walking and running connections while respecting vehicle timetables, with an interactive map and a Google Maps companion extension.',tools:'Python · JavaScript · Google Routes API',links:[{label:'View the project',url:'https://github.com/lacha25/Running-Routes'}]},
      {title:'Live aircraft tracking',year:'2023',context:'A collaborative project · EPFL',description:'Decoding ADS-B aircraft broadcasts and displaying aircraft positions and trajectories on an interactive map.',tools:'Java · JavaFX · Signal processing',links:[{label:'View the project',url:'https://github.com/lacha25/flight-tracker-'}]}
    ]
  }
};
