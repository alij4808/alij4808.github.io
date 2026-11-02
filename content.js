window.PORTFOLIO = {
  neuro: {
    title: 'Neuroscience',
    projects: [
      {title:'Neural decoding & spiking representations',year:'2026',context:'Research internship · Institute of Neuroinformatics',description:'Worked with high-dimensional neural spike data from a primate grasping dataset to decode continuous movement.',details:['Benchmarked temporal decoders for continuous kinematics.','Evaluated a spiking autoencoder trained with Differentiated Target Propagation against PCA and raw features.']},
      {title:'Generative EEG embeddings',year:'2026',context:'Research project · ETH Zurich',description:'Used model parameters to study muscarinic neuromodulation of the mismatch-negativity circuit.',details:['Applied Bayesian dynamic causal modelling to EEG event-related potentials.','Used the inferred parameters to build an individual-level classifier.']},
      {title:'Brain Explorer',year:'2026',description:'A 3D atlas connecting brain anatomy with region functions, learning mechanisms and linked scientific literature.',tools:'JavaScript · Three.js',links:[{label:'Explore the atlas',url:'https://lacha25.github.io/brain-explorer/'},{label:'Source code',url:'https://github.com/lacha25/brain-explorer'}]}
    ]
  },
  serious: {
    title: 'Serious projects',
    projects: [
      {title:'AI Scientist Harness & Benchmark',year:'2026 · ongoing',context:'ETH Zurich',description:'Developing an agent harness for the mechanical engineering department, with an exam-based evaluation pipeline.'},
      {title:'Gipfelsturm LLM Training Challenge',year:'2026',context:'ETH Zurich · CSCS',description:'Explored the trade-offs of training 125M–8B parameter models with Megatron-LM under a 30-minute compute budget.',details:['Compared microbatch sizes, numerical precision, dataloader workers and gradient checkpointing.','Used Chinchilla scaling laws to reason about compute allocation.']},
      {title:'Alpine Guard',year:'2025',context:'Swiss AI Hackathon · Team prototype',description:'A glacier-exploration and risk-estimation prototype. I contributed to the Python backend and machine learning risk-model pipeline.',tools:'Python · FastAPI · scikit-learn',links:[{label:'View the project',url:'https://github.com/eliemada/swiss-ai-hackathon-25'}]},
      {title:'Fashion-MNIST classification',year:'2024',context:'EPFL · 2nd out of 133',description:'Compared CNNs, multilayer perceptrons and Vision Transformers with data augmentation and architecture and optimizer sweeps.'}
    ]
  },
  fun: {
    title: 'Just for fun',
    projects: [
      {title:'PubCrawl',year:'2024',context:'Team hackathon project',description:'A mobile app for planning a pub crawl, with an interactive map and directions between stops. I contributed to the map and route interface.',tools:'TypeScript · React Native · Expo',links:[{label:'View the project',url:'https://github.com/Crawl-App/app-frontend'}]},
      {title:'RunMap',year:'2026',description:'A transit planner that compares walking and running connections while respecting vehicle timetables, with an interactive map and a Google Maps companion extension.',tools:'Python · JavaScript · Google Routes API',links:[{label:'View the project',url:'https://github.com/lacha25/Running-Routes'}]},
      {title:'Live aircraft tracking',year:'2023',context:'EPFL · Collaborative project',description:'Decoding ADS-B aircraft broadcasts and displaying aircraft positions and trajectories on an interactive map.',tools:'Java · JavaFX',links:[{label:'View the project',url:'https://github.com/lacha25/flight-tracker-'}]}
    ]
  }
};
