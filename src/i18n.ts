export type Language = 'en' | 'es' | 'fr' | 'pt'

export const defaultLanguage: Language = 'en'
export const supportedLanguages: Language[] = ['en', 'es', 'fr', 'pt']

export const languageLabels: Record<Language, string> = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  pt: 'PT',
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
}

type ServiceItem = {
  accent: string
  icon: string
  title: string
  description: string
  points: string[]
  ctaLabel: string
}

type ProcessItem = {
  number: string
  icon: string
  title: string
  text: string
}

type WhyItem = {
  icon: string
  title: string
  text: string
}

type PortfolioItem = {
  title: string
  text: string
  stack: string
  impact: string
}

type FaqItem = {
  question: string
  answer: string
}

type StatItem = {
  value: string
  label: string
}

type TechCategory = {
  label: string
  items: string[]
}

type Translation = {
  brand: {
    label: string
    tagline: string
    disclaimer: string
    homeAriaLabel: string
  }
  nav: {
    primaryAriaLabel: string
    services: string
    solutions: string
    process: string
    portfolio: string
    about: string
    faq: string
    contact: string
    cta: string
    languageSwitcherLabel: string
  }
  hero: {
    eyebrow: string
    titleLead: string
    titleAccent: string
    description: string
    trustAriaLabel: string
    trustPoints: string[]
    primaryCta: string
    secondaryCta: string
    stackCards: string[]
  }
  services: {
    eyebrow: string
    title: string
    subtitle: string
    learnMoreAriaPrefix: string
    items: ServiceItem[]
  }
  process: {
    eyebrow: string
    title: string
    subtitle: string
    steps: ProcessItem[]
  }
  why: {
    eyebrow: string
    titleLead: string
    titleAccent: string
    items: WhyItem[]
  }
  tech: {
    eyebrow: string
    title: string
    categories: TechCategory[]
  }
  industries: {
    eyebrow: string
    title: string
    items: string[]
    note: string
  }
  portfolio: {
    eyebrow: string
    title: string
    stackLabel: string
    impactLabel: string
    items: PortfolioItem[]
  }
  faq: {
    eyebrow: string
    title: string
    subtitle: string
    items: FaqItem[]
  }
  cta: {
    titleLead: string
    titleAccent: string
    titleTail: string
    description: string
    trust: string
    primaryCta: string
    secondaryCta: string
    payCta: string
    statsAriaLabel: string
    stats: StatItem[]
  }
  footer: {
    description: string
    services: string
    process: string
    faq: string
    contact: string
    copyright: string
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    brand: {
      label: 'GMX LABS',
      tagline: 'Independent Web3 and AI Development Studio',
      disclaimer: 'Independent development studio. Not affiliated with GMX Protocol.',
      homeAriaLabel: 'GMX Labs home',
    },
    nav: {
      primaryAriaLabel: 'Primary',
      services: 'Services',
      solutions: 'Solutions',
      process: 'Process',
      portfolio: 'Portfolio',
      about: 'About Us',
      faq: 'FAQ',
      contact: 'Contact',
      cta: "Let's Talk",
      languageSwitcherLabel: 'Select language',
    },
    hero: {
      eyebrow: 'Web3 + AI Engineering',
      titleLead: 'We build secure Web3 and',
      titleAccent: 'AI-powered applications.',
      description: 'From architecture to deployment, we design, build, and audit production-ready systems engineered to scale.',
      trustAriaLabel: 'Trust points',
      trustPoints: ['Security-first delivery', 'Audit-ready architecture', 'Production-focused execution'],
      primaryCta: 'Book Strategy Call',
      secondaryCta: 'Get Technical Assessment',
      stackCards: ['Web2', 'Web3', 'AI', 'Blockchain'],
    },
    services: {
      eyebrow: 'Core Capabilities',
      title: 'What We Build',
      subtitle: 'Specialized engineering for teams building in Web3 and AI, with full-stack product execution.',
      learnMoreAriaPrefix: 'Learn more about',
      items: [
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Web3 and Smart Contract Engineering',
          description: 'Secure protocol architecture and smart contract systems prepared for audits and production usage.',
          points: [
            'Secure smart contracts with audit-ready architecture',
            'DeFi protocols for trading, staking, and liquidity systems',
            'Token systems and on-chain governance mechanics',
            'Wallet and dApp integration',
            'Cross-chain interoperability design',
          ],
          ctaLabel: 'Get Technical Scope',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'AI Systems and Automation',
          description: 'Applied AI systems that automate operations, improve decision quality, and reduce manual overhead.',
          points: [
            'AI agents that automate operations and reduce costs',
            'Custom ML models for prediction and analysis',
            'Intelligent chatbots and NLP systems',
            'Data pipelines and analytics dashboards',
            'Workflow automation designed to scale',
          ],
          ctaLabel: 'Get Technical Scope',
        },
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Full-Stack Product Development',
          description: 'Production-grade applications and infrastructure to support demanding product roadmaps.',
          points: [
            'Production-grade web applications and dashboards',
            'API architecture and third-party integrations',
            'SaaS platforms and internal tooling',
            'Cloud infrastructure and DevOps delivery',
          ],
          ctaLabel: 'Get Technical Scope',
        },
      ],
    },
    process: {
      eyebrow: 'Our Process',
      title: 'How We Work',
      subtitle: 'A structured path from idea to deployment with security and execution discipline.',
      steps: [
        { number: '1.', icon: '💡', title: 'Discover', text: 'We analyze goals, technical requirements, and market context.' },
        { number: '2.', icon: '✍️', title: 'Plan', text: 'We define architecture, security model, and delivery roadmap.' },
        { number: '3.', icon: '</>', title: 'Build', text: 'We develop, test, and integrate with engineering precision.' },
        { number: '4.', icon: '🚀', title: 'Launch', text: 'We deploy your solution and ensure a clean go-live.' },
        { number: '5.', icon: '📈', title: 'Grow', text: 'We optimize, scale, and support continuous product growth.' },
      ],
    },
    why: {
      eyebrow: 'Why GMX Labs',
      titleLead: 'Built for serious',
      titleAccent: 'Web3 delivery',
      items: [
        { icon: '🧠', title: 'DeFi-native engineering', text: 'Built by engineers with hands-on smart contract and DeFi delivery experience.' },
        { icon: '🛡️', title: 'Security-first mindset', text: 'We design like defenders and think like attackers from day one.' },
        { icon: '🏗️', title: 'Production-ready systems', text: 'We ship maintainable systems, not fragile prototypes.' },
        { icon: '⚡', title: 'Fast without compromise', text: 'Rapid execution with auditability and code quality preserved.' },
      ],
    },
    tech: {
      eyebrow: 'Technical Credibility',
      title: 'Our Stack',
      categories: [
        { label: 'Smart Contracts', items: ['Solidity', 'Foundry', 'Hardhat'] },
        { label: 'Blockchain', items: ['EVM', 'Arbitrum', 'Polygon', 'Solana'] },
        { label: 'Backend', items: ['Node.js', 'TypeScript', 'Python'] },
        { label: 'Frontend', items: ['React', 'Next.js', 'Vite'] },
        { label: 'AI and ML', items: ['Python', 'TensorFlow', 'LangChain'] },
        { label: 'Infrastructure', items: ['AWS', 'Vercel', 'Docker'] },
      ],
    },
    industries: {
      eyebrow: 'Industries We Serve',
      title: 'Who We Help',
      items: ['DeFi and Web3 Protocols', 'AI and Data Companies', 'Fintech Startups', 'SaaS Founders'],
      note: 'Focused support for teams where technical execution directly drives business outcomes.',
    },
    portfolio: {
      eyebrow: 'Featured Work',
      title: 'Portfolio Highlights',
      stackLabel: 'Stack:',
      impactLabel: 'Impact:',
      items: [
        {
          title: 'DeFi Trading Intelligence Platform',
          text: 'Real-time on-chain analytics pipelines supporting faster strategy decisions for protocol teams.',
          stack: 'Solidity, Node.js, React, The Graph',
          impact: 'Reduced decision latency by streaming DEX metrics in real time.',
        },
        {
          title: 'Tokenized Asset Infrastructure',
          text: 'Smart contract architecture and backend services for compliant tokenized ecosystems.',
          stack: 'Solidity, TypeScript, React, AWS',
          impact: 'Accelerated launch readiness with secure contract lifecycle and monitoring.',
        },
        {
          title: 'AI Operations Engine',
          text: 'Agent-powered automation workflows for delivery, reporting, and operational support.',
          stack: 'Python, LangChain, Node.js, Vercel',
          impact: 'Lowered manual operational load and improved execution consistency.',
        },
      ],
    },
    faq: {
      eyebrow: 'DeFi and Web3 Development FAQs',
      title: 'Questions Founders Ask Before Building',
      subtitle: 'Clear answers for teams planning Web3 apps, smart contract audits, and AI-enabled blockchain products.',
      items: [
        {
          question: 'What does a DeFi development agency do?',
          answer: 'A DeFi development agency designs, builds, and deploys decentralized finance products such as trading systems, staking modules, lending flows, and protocol dashboards.',
        },
        {
          question: 'How much does smart contract development cost?',
          answer: 'Cost depends on scope, chain complexity, and testing depth. Projects range from focused MVP contracts to full production-grade contract suites.',
        },
        {
          question: 'What is included in a smart contract audit?',
          answer: 'Typical scope includes code review, threat modeling, vulnerability testing, exploit simulation, and prioritized remediation guidance.',
        },
        {
          question: 'How long does it take to build a Web3 app?',
          answer: 'A focused MVP can launch in weeks. Larger products require phased delivery across architecture, development, testing, and deployment.',
        },
        {
          question: 'Can you integrate AI into blockchain products?',
          answer: 'Yes. We build AI layers for on-chain analytics, risk monitoring, workflow automation, and product operations.',
        },
      ],
    },
    cta: {
      titleLead: 'Building in Web3 or',
      titleAccent: 'AI',
      titleTail: '?',
      description: 'Let us review your architecture and define a practical implementation plan.',
      trust: 'Technical support for founders, CTOs, and product teams shipping high-stakes systems.',
      primaryCta: 'Book Strategy Call',
      secondaryCta: 'Get Project Estimate',
      payCta: 'Start Your Project',
      statsAriaLabel: 'Company stats',
      stats: [
        { value: '50+', label: 'Projects Delivered' },
        { value: '30+', label: 'Happy Clients' },
        { value: '4+', label: 'Years Experience' },
      ],
    },
    footer: {
      description: 'Specialized digital engineering for Web3 and AI products.',
      services: 'Services',
      process: 'Process',
      faq: 'FAQ',
      contact: 'Contact',
      copyright: 'Copyright 2026 GMX Labs',
    },
  },
  es: {
    brand: {
      label: 'GMX LABS',
      tagline: 'Estudio independiente de desarrollo Web3 e IA',
      disclaimer: 'Estudio de desarrollo independiente. Sin afiliacion con GMX Protocol.',
      homeAriaLabel: 'Inicio de GMX Labs',
    },
    nav: {
      primaryAriaLabel: 'Principal',
      services: 'Servicios',
      solutions: 'Soluciones',
      process: 'Proceso',
      portfolio: 'Portafolio',
      about: 'Nosotros',
      faq: 'FAQ',
      contact: 'Contacto',
      cta: 'Hablemos',
      languageSwitcherLabel: 'Seleccionar idioma',
    },
    hero: {
      eyebrow: 'Ingenieria Web3 + IA',
      titleLead: 'Construimos aplicaciones seguras',
      titleAccent: 'Web3 e IA para produccion.',
      description: 'Desde arquitectura hasta despliegue, diseniamos, construimos y auditamos sistemas listos para escalar.',
      trustAriaLabel: 'Puntos de confianza',
      trustPoints: ['Entrega orientada a seguridad', 'Arquitectura lista para auditoria', 'Ejecucion enfocada en produccion'],
      primaryCta: 'Reservar llamada estrategica',
      secondaryCta: 'Solicitar evaluación técnica',
      stackCards: ['Web2', 'Web3', 'IA', 'Blockchain'],
    },
    services: {
      eyebrow: 'Capacidades Core',
      title: 'Lo Que Construimos',
      subtitle: 'Ingenieria especializada para equipos que construyen en Web3 e IA.',
      learnMoreAriaPrefix: 'Conocer mas sobre',
      items: [
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Ingenieria Web3 y Smart Contracts',
          description: 'Arquitectura segura de protocolos y sistemas de contratos inteligentes listos para auditoria.',
          points: [
            'Smart contracts seguros con arquitectura preparada para auditoria',
            'Protocolos DeFi para trading, staking y liquidez',
            'Sistemas de tokens y gobernanza on-chain',
            'Integracion de wallets y dApps',
            'Disenio de interoperabilidad cross-chain',
          ],
          ctaLabel: 'Definir alcance tecnico',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'Sistemas de IA y Automatizacion',
          description: 'Sistemas de IA aplicados para automatizar operaciones y reducir costos.',
          points: [
            'Agentes de IA que automatizan operaciones',
            'Modelos ML para prediccion y analisis',
            'Chatbots inteligentes y NLP',
            'Pipelines de datos y dashboards analiticos',
            'Automatizacion de workflows a escala',
          ],
          ctaLabel: 'Definir alcance tecnico',
        },
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Desarrollo Full-Stack de Producto',
          description: 'Aplicaciones e infraestructura listas para produccion y roadmap exigente.',
          points: [
            'Aplicaciones web productivas y dashboards',
            'Arquitectura de APIs e integraciones',
            'Plataformas SaaS y tooling interno',
            'Infraestructura cloud y entrega DevOps',
          ],
          ctaLabel: 'Definir alcance tecnico',
        },
      ],
    },
    process: {
      eyebrow: 'Nuestro Proceso',
      title: 'Como Trabajamos',
      subtitle: 'Ruta clara desde idea hasta despliegue con disciplina tecnica.',
      steps: [
        { number: '1.', icon: '💡', title: 'Descubrir', text: 'Analizamos objetivos, requerimientos tecnicos y contexto de negocio.' },
        { number: '2.', icon: '✍️', title: 'Planificar', text: 'Definimos arquitectura, modelo de seguridad y roadmap de entrega.' },
        { number: '3.', icon: '</>', title: 'Construir', text: 'Desarrollamos, probamos e integramos con precision.' },
        { number: '4.', icon: '🚀', title: 'Lanzar', text: 'Desplegamos y aseguramos una salida limpia a produccion.' },
        { number: '5.', icon: '📈', title: 'Escalar', text: 'Optimizamos, escalamos y acompanamos evolucion continua.' },
      ],
    },
    why: {
      eyebrow: 'Por Que GMX Labs',
      titleLead: 'Especialistas en',
      titleAccent: 'entrega Web3',
      items: [
        { icon: '🧠', title: 'Ingenieria DeFi real', text: 'Equipo con experiencia real en smart contracts y sistemas DeFi.' },
        { icon: '🛡️', title: 'Seguridad como prioridad', text: 'Diseniamos como defensores y pensamos como atacantes.' },
        { icon: '🏗️', title: 'Sistemas de produccion', text: 'Entregamos sistemas mantenibles, no prototipos fragiles.' },
        { icon: '⚡', title: 'Rapidez con calidad', text: 'Ejecucion veloz sin sacrificar auditabilidad ni calidad de codigo.' },
      ],
    },
    tech: {
      eyebrow: 'Credibilidad Tecnica',
      title: 'Nuestro Stack',
      categories: [
        { label: 'Smart Contracts', items: ['Solidity', 'Foundry', 'Hardhat'] },
        { label: 'Blockchain', items: ['EVM', 'Arbitrum', 'Polygon', 'Solana'] },
        { label: 'Backend', items: ['Node.js', 'TypeScript', 'Python'] },
        { label: 'Frontend', items: ['React', 'Next.js', 'Vite'] },
        { label: 'IA y ML', items: ['Python', 'TensorFlow', 'LangChain'] },
        { label: 'Infraestructura', items: ['AWS', 'Vercel', 'Docker'] },
      ],
    },
    industries: {
      eyebrow: 'Industrias Que Atendemos',
      title: 'A Quien Ayudamos',
      items: ['Protocolos DeFi y Web3', 'Empresas de IA y Datos', 'Startups Fintech', 'Fundadores SaaS'],
      note: 'Nos enfocamos en verticales donde la ejecucion tecnica define el resultado de negocio.',
    },
    portfolio: {
      eyebrow: 'Trabajo Destacado',
      title: 'Portafolio Tecnico',
      stackLabel: 'Stack:',
      impactLabel: 'Impacto:',
      items: [
        {
          title: 'Plataforma de inteligencia DeFi',
          text: 'Pipelines on-chain en tiempo real para decisiones de estrategia de trading.',
          stack: 'Solidity, Node.js, React, The Graph',
          impact: 'Redujo latencia de decision con datos DEX en tiempo real.',
        },
        {
          title: 'Infraestructura de activos tokenizados',
          text: 'Arquitectura de contratos y backend para ecosistemas tokenizados.',
          stack: 'Solidity, TypeScript, React, AWS',
          impact: 'Acelero la preparación para el lanzamiento con trazabilidad y seguridad.',
        },
        {
          title: 'Motor de operaciones con IA',
          text: 'Automatizacion con agentes para operaciones y reporting tecnico.',
          stack: 'Python, LangChain, Node.js, Vercel',
          impact: 'Redujo carga manual y mejoro consistencia operativa.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQs DeFi y Web3',
      title: 'Preguntas Antes de Construir',
      subtitle: 'Respuestas claras para equipos que planean productos Web3 y auditorias de smart contracts.',
      items: [
        { question: 'Que hace una agencia DeFi?', answer: 'Disenia, construye y despliega productos financieros descentralizados como trading, staking, lending y dashboards de protocolo.' },
        { question: 'Cuanto cuesta desarrollar smart contracts?', answer: 'Depende del alcance, complejidad de la red y profundidad de testing. Va desde MVPs hasta suites completas para produccion.' },
        { question: 'Que incluye una auditoria de smart contracts?', answer: 'Revision de codigo, modelado de amenazas, pruebas de vulnerabilidades y plan priorizado de remediacion.' },
        { question: 'Cuanto tarda una app Web3?', answer: 'Un MVP puede lanzarse en semanas. Productos mayores requieren fases de arquitectura, desarrollo, pruebas y despliegue.' },
        { question: 'Pueden integrar IA en blockchain?', answer: 'Si. Implementamos IA para analitica on-chain, monitoreo de riesgo y automatizacion operativa.' },
      ],
    },
    cta: {
      titleLead: 'Construyendo en Web3 o',
      titleAccent: 'IA',
      titleTail: '?',
      description: 'Revisemos tu arquitectura y definamos un plan de implementacion claro.',
      trust: 'Soporte tecnico para fundadores, CTOs y equipos de producto.',
      primaryCta: 'Reservar llamada estrategica',
      secondaryCta: 'Solicitar estimacion',
      payCta: 'Iniciar proyecto',
      statsAriaLabel: 'Metricas de la compania',
      stats: [
        { value: '50+', label: 'Proyectos entregados' },
        { value: '30+', label: 'Clientes satisfechos' },
        { value: '4+', label: 'Anos de experiencia' },
      ],
    },
    footer: {
      description: 'Ingenieria digital especializada para productos Web3 e IA.',
      services: 'Servicios',
      process: 'Proceso',
      faq: 'FAQ',
      contact: 'Contacto',
      copyright: 'Copyright 2026 GMX Labs',
    },
  },
  fr: {
    brand: {
      label: 'GMX LABS',
      tagline: 'Studio independant de developpement Web3 et IA',
      disclaimer: 'Studio independant. Sans affiliation avec GMX Protocol.',
      homeAriaLabel: 'Accueil GMX Labs',
    },
    nav: {
      primaryAriaLabel: 'Navigation principale',
      services: 'Services',
      solutions: 'Solutions',
      process: 'Processus',
      portfolio: 'Portfolio',
      about: 'A propos',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'Parlons-en',
      languageSwitcherLabel: 'Choisir la langue',
    },
    hero: {
      eyebrow: 'Ingenierie Web3 + IA',
      titleLead: 'Nous concevons des applications',
      titleAccent: 'Web3 et IA securisees.',
      description: 'De l architecture au deploiement, nous livrons des systemes prets pour la production et concus pour evoluer.',
      trustAriaLabel: 'Points de confiance',
      trustPoints: ['Livraison orientee securite', 'Architecture prete pour audit', 'Execution orientee production'],
      primaryCta: 'Reserver un appel strategique',
      secondaryCta: 'Demander une évaluation technique',
      stackCards: ['Web2', 'Web3', 'IA', 'Blockchain'],
    },
    services: {
      eyebrow: 'Capacites Principales',
      title: 'Ce Que Nous Construisons',
      subtitle: 'Ingenierie specialisee pour les equipes qui construisent en Web3 et IA.',
      learnMoreAriaPrefix: 'En savoir plus sur',
      items: [
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Ingenierie Web3 et Smart Contracts',
          description: 'Architecture de protocoles securises et systemes de smart contracts prets pour audit.',
          points: [
            'Smart contracts securises avec architecture prête pour l audit',
            'Protocoles DeFi pour trading, staking et liquidite',
            'Systemes de tokens et gouvernance on-chain',
            'Integration wallet et dApps',
            'Conception interoperabilite cross-chain',
          ],
          ctaLabel: 'Définir le périmètre technique',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'Systemes IA et Automatisation',
          description: 'Systemes IA appliques pour automatiser les operations et reduire les couts.',
          points: [
            'Agents IA pour automatiser les operations',
            'Modeles ML pour prediction et analyse',
            'Chatbots intelligents et NLP',
            'Pipelines data et dashboards analytiques',
            'Automatisation de workflows a l echelle',
          ],
          ctaLabel: 'Définir le périmètre technique',
        },
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Developpement Produit Full-Stack',
          description: 'Applications et infrastructure pretes pour la production.',
          points: [
            'Applications web robustes et dashboards',
            'Architecture API et integrations tierces',
            'Plateformes SaaS et outils internes',
            'Infrastructure cloud et livraison DevOps',
          ],
          ctaLabel: 'Définir le périmètre technique',
        },
      ],
    },
    process: {
      eyebrow: 'Notre Processus',
      title: 'Comment Nous Travaillons',
      subtitle: 'Un parcours clair de l idee au deploiement avec discipline technique.',
      steps: [
        { number: '1.', icon: '💡', title: 'Decouvrir', text: 'Nous analysons objectifs, exigences techniques et contexte marche.' },
        { number: '2.', icon: '✍️', title: 'Planifier', text: 'Nous definissons architecture, modele de securite et roadmap.' },
        { number: '3.', icon: '</>', title: 'Construire', text: 'Nous developpons, testons et integrons avec precision.' },
        { number: '4.', icon: '🚀', title: 'Lancer', text: 'Nous deployons et assurons une mise en production propre.' },
        { number: '5.', icon: '📈', title: 'Evoluer', text: 'Nous optimisons, faisons evoluer et accompagnons votre croissance.' },
      ],
    },
    why: {
      eyebrow: 'Pourquoi GMX Labs',
      titleLead: 'Specialistes de',
      titleAccent: 'la livraison Web3',
      items: [
        { icon: '🧠', title: 'Ingenierie DeFi concrete', text: 'Equipe avec experience terrain en smart contracts et protocoles DeFi.' },
        { icon: '🛡️', title: 'Securite d abord', text: 'Nous concevons comme des defenseurs et pensons comme des attaquants.' },
        { icon: '🏗️', title: 'Systemes production', text: 'Nous livrons des systemes maintenables, pas des prototypes fragiles.' },
        { icon: '⚡', title: 'Rapide sans compromis', text: 'Execution rapide avec auditabilite et qualite de code.' },
      ],
    },
    tech: {
      eyebrow: 'Credibilite Technique',
      title: 'Notre Stack',
      categories: [
        { label: 'Smart Contracts', items: ['Solidity', 'Foundry', 'Hardhat'] },
        { label: 'Blockchain', items: ['EVM', 'Arbitrum', 'Polygon', 'Solana'] },
        { label: 'Backend', items: ['Node.js', 'TypeScript', 'Python'] },
        { label: 'Frontend', items: ['React', 'Next.js', 'Vite'] },
        { label: 'IA et ML', items: ['Python', 'TensorFlow', 'LangChain'] },
        { label: 'Infrastructure', items: ['AWS', 'Vercel', 'Docker'] },
      ],
    },
    industries: {
      eyebrow: 'Secteurs Cibles',
      title: 'Qui Nous Aidons',
      items: ['Protocoles DeFi et Web3', 'Entreprises IA et Data', 'Startups Fintech', 'Fondateurs SaaS'],
      note: 'Nous nous concentrons sur les verticales ou l execution technique determine le resultat business.',
    },
    portfolio: {
      eyebrow: 'Realisations',
      title: 'Portfolio Technique',
      stackLabel: 'Stack :',
      impactLabel: 'Impact :',
      items: [
        {
          title: 'Plateforme intelligence DeFi',
          text: 'Pipelines on-chain en temps reel pour accelerer les decisions de strategie.',
          stack: 'Solidity, Node.js, React, The Graph',
          impact: 'Reduction de latence de decision grace aux donnees DEX en direct.',
        },
        {
          title: 'Infrastructure actifs tokenises',
          text: 'Architecture smart contracts et backend pour ecosystemes tokenises.',
          stack: 'Solidity, TypeScript, React, AWS',
          impact: 'Acceleration de la préparation au lancement avec securite accrue.',
        },
        {
          title: 'Moteur operations IA',
          text: 'Automatisation par agents pour operations et reporting technique.',
          stack: 'Python, LangChain, Node.js, Vercel',
          impact: 'Reduction des taches manuelles et meilleure fiabilite operationnelle.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ DeFi et Web3',
      title: 'Questions Avant De Construire',
      subtitle: 'Reponses claires pour les equipes qui lancent des produits Web3 et IA.',
      items: [
        { question: 'Que fait une agence DeFi ?', answer: 'Elle concoit, developpe et deploie des produits de finance decentralisee : trading, staking, lending et dashboards protocolaires.' },
        { question: 'Quel est le cout d un smart contract ?', answer: 'Le cout depend du perimetre, de la complexite de la chaine et du niveau de tests.' },
        { question: 'Que comprend un audit de smart contracts ?', answer: 'Revue de code, modelisation des menaces, tests de vulnerabilite et plan de remediation priorise.' },
        { question: 'Combien de temps pour une app Web3 ?', answer: 'Un MVP peut sortir en quelques semaines. Les produits plus larges exigent des phases structurees.' },
        { question: 'Pouvez-vous integrer l IA a la blockchain ?', answer: 'Oui, pour analytics on-chain, monitoring du risque et automatisation des operations.' },
      ],
    },
    cta: {
      titleLead: 'Vous construisez en Web3 ou',
      titleAccent: 'IA',
      titleTail: ' ?',
      description: 'Discutons de votre architecture et definissons une implementation pragmatique.',
      trust: 'Support technique pour fondateurs, CTOs et equipes produit.',
      primaryCta: 'Reserver un appel strategique',
      secondaryCta: 'Demander une estimation',
      payCta: 'Démarrer le projet',
      statsAriaLabel: 'Indicateurs entreprise',
      stats: [
        { value: '50+', label: 'Projets livres' },
        { value: '30+', label: 'Clients satisfaits' },
        { value: '4+', label: 'Ans experience' },
      ],
    },
    footer: {
      description: 'Ingenierie digitale specialisee pour produits Web3 et IA.',
      services: 'Services',
      process: 'Processus',
      faq: 'FAQ',
      contact: 'Contact',
      copyright: 'Copyright 2026 GMX Labs',
    },
  },
  pt: {
    brand: {
      label: 'GMX LABS',
      tagline: 'Estudio independente de desenvolvimento Web3 e IA',
      disclaimer: 'Estudio independente. Sem afiliacao com GMX Protocol.',
      homeAriaLabel: 'Inicio da GMX Labs',
    },
    nav: {
      primaryAriaLabel: 'Principal',
      services: 'Servicos',
      solutions: 'Solucoes',
      process: 'Processo',
      portfolio: 'Portfolio',
      about: 'Sobre nos',
      faq: 'FAQ',
      contact: 'Contato',
      cta: 'Vamos conversar',
      languageSwitcherLabel: 'Selecionar idioma',
    },
    hero: {
      eyebrow: 'Engenharia Web3 + IA',
      titleLead: 'Construimos aplicacoes seguras',
      titleAccent: 'Web3 e IA para producao.',
      description: 'Da arquitetura ao deploy, desenhamos, desenvolvemos e auditamos sistemas prontos para escalar.',
      trustAriaLabel: 'Pontos de confianca',
      trustPoints: ['Entrega com foco em seguranca', 'Arquitetura preparada para auditoria', 'Execucao orientada a producao'],
      primaryCta: 'Agendar call estrategica',
      secondaryCta: 'Solicitar avaliação técnica',
      stackCards: ['Web2', 'Web3', 'IA', 'Blockchain'],
    },
    services: {
      eyebrow: 'Capacidades Principais',
      title: 'O Que Construimos',
      subtitle: 'Engenharia especializada para equipes construindo em Web3 e IA.',
      learnMoreAriaPrefix: 'Saiba mais sobre',
      items: [
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Engenharia Web3 e Smart Contracts',
          description: 'Arquitetura segura de protocolos e contratos inteligentes prontos para auditoria.',
          points: [
            'Smart contracts seguros com arquitetura preparada para auditoria',
            'Protocolos DeFi para trading, staking e liquidez',
            'Sistemas de token e governanca on-chain',
            'Integracao de wallets e dApps',
            'Design de interoperabilidade cross-chain',
          ],
          ctaLabel: 'Definir escopo tecnico',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'Sistemas de IA e Automacao',
          description: 'Sistemas de IA aplicados para automatizar operacoes e reduzir custos.',
          points: [
            'Agentes de IA para automatizar operacoes',
            'Modelos ML para previsao e analise',
            'Chatbots inteligentes e NLP',
            'Pipelines de dados e dashboards',
            'Automacao de workflows em escala',
          ],
          ctaLabel: 'Definir escopo tecnico',
        },
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Desenvolvimento Full-Stack',
          description: 'Aplicacoes e infraestrutura prontas para ambientes de producao exigentes.',
          points: [
            'Aplicacoes web e dashboards de producao',
            'Arquitetura de APIs e integracoes',
            'Plataformas SaaS e ferramentas internas',
            'Infraestrutura cloud e entrega DevOps',
          ],
          ctaLabel: 'Definir escopo tecnico',
        },
      ],
    },
    process: {
      eyebrow: 'Nosso Processo',
      title: 'Como Trabalhamos',
      subtitle: 'Caminho estruturado da ideia ao deploy com disciplina tecnica.',
      steps: [
        { number: '1.', icon: '💡', title: 'Descobrir', text: 'Analisamos objetivos, requisitos tecnicos e contexto de mercado.' },
        { number: '2.', icon: '✍️', title: 'Planejar', text: 'Definimos arquitetura, modelo de seguranca e roadmap.' },
        { number: '3.', icon: '</>', title: 'Construir', text: 'Desenvolvemos, testamos e integramos com precisao.' },
        { number: '4.', icon: '🚀', title: 'Lancar', text: 'Fazemos deploy e garantimos um go-live limpo.' },
        { number: '5.', icon: '📈', title: 'Escalar', text: 'Otimizamos, escalamos e apoiamos crescimento continuo.' },
      ],
    },
    why: {
      eyebrow: 'Por Que GMX Labs',
      titleLead: 'Especialistas em',
      titleAccent: 'entrega Web3',
      items: [
        { icon: '🧠', title: 'Engenharia DeFi real', text: 'Equipe com experiencia pratica em smart contracts e protocolos DeFi.' },
        { icon: '🛡️', title: 'Seguranca primeiro', text: 'Projetamos como defensores e pensamos como atacantes.' },
        { icon: '🏗️', title: 'Sistemas de producao', text: 'Entregamos sistemas mantiveis, nao prototipos frageis.' },
        { icon: '⚡', title: 'Rapido com qualidade', text: 'Execucao veloz sem comprometer auditabilidade ou qualidade.' },
      ],
    },
    tech: {
      eyebrow: 'Credibilidade Tecnica',
      title: 'Nosso Stack',
      categories: [
        { label: 'Smart Contracts', items: ['Solidity', 'Foundry', 'Hardhat'] },
        { label: 'Blockchain', items: ['EVM', 'Arbitrum', 'Polygon', 'Solana'] },
        { label: 'Backend', items: ['Node.js', 'TypeScript', 'Python'] },
        { label: 'Frontend', items: ['React', 'Next.js', 'Vite'] },
        { label: 'IA e ML', items: ['Python', 'TensorFlow', 'LangChain'] },
        { label: 'Infraestrutura', items: ['AWS', 'Vercel', 'Docker'] },
      ],
    },
    industries: {
      eyebrow: 'Setores Atendidos',
      title: 'Quem Ajudamos',
      items: ['Protocolos DeFi e Web3', 'Empresas de IA e Dados', 'Startups Fintech', 'Fundadores SaaS'],
      note: 'Foco em verticais onde execucao tecnica impacta diretamente o resultado de negocio.',
    },
    portfolio: {
      eyebrow: 'Trabalhos em Destaque',
      title: 'Portfolio Tecnico',
      stackLabel: 'Stack:',
      impactLabel: 'Impacto:',
      items: [
        {
          title: 'Plataforma de inteligencia DeFi',
          text: 'Pipelines on-chain em tempo real para acelerar decisoes de estrategia.',
          stack: 'Solidity, Node.js, React, The Graph',
          impact: 'Reduziu latencia de decisao com dados DEX ao vivo.',
        },
        {
          title: 'Infraestrutura de ativos tokenizados',
          text: 'Arquitetura de contratos e backend para ecossistemas tokenizados.',
          stack: 'Solidity, TypeScript, React, AWS',
          impact: 'Acelerou a preparação para lancamento com seguranca reforcada.',
        },
        {
          title: 'Motor de operacoes com IA',
          text: 'Automacao por agentes para operacoes e reporting tecnico.',
          stack: 'Python, LangChain, Node.js, Vercel',
          impact: 'Reduziu trabalho manual e aumentou consistencia operacional.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ DeFi e Web3',
      title: 'Perguntas Antes de Construir',
      subtitle: 'Respostas claras para equipes que planejam produtos Web3 e IA.',
      items: [
        { question: 'O que faz uma agencia DeFi?', answer: 'Ela projeta, desenvolve e implanta produtos de financas descentralizadas como trading, staking, lending e dashboards.' },
        { question: 'Quanto custa desenvolver smart contracts?', answer: 'Depende do escopo, da complexidade da rede e da profundidade dos testes.' },
        { question: 'O que inclui uma auditoria de smart contracts?', answer: 'Revisao de codigo, modelagem de ameacas, testes de vulnerabilidades e plano de remediacao priorizado.' },
        { question: 'Quanto tempo leva um app Web3?', answer: 'Um MVP pode ser lancado em semanas. Produtos maiores exigem fases estruturadas.' },
        { question: 'Vocês integram IA em blockchain?', answer: 'Sim. Implementamos IA para analytics on-chain, monitoramento de risco e automacao operacional.' },
      ],
    },
    cta: {
      titleLead: 'Construindo em Web3 ou',
      titleAccent: 'IA',
      titleTail: '?',
      description: 'Vamos discutir sua arquitetura e definir uma implementacao pragmatica.',
      trust: 'Suporte tecnico para fundadores, CTOs e times de produto.',
      primaryCta: 'Agendar call estrategica',
      secondaryCta: 'Solicitar estimativa',
      payCta: 'Iniciar projeto',
      statsAriaLabel: 'Metricas da empresa',
      stats: [
        { value: '50+', label: 'Projetos entregues' },
        { value: '30+', label: 'Clientes satisfeitos' },
        { value: '4+', label: 'Anos de experiencia' },
      ],
    },
    footer: {
      description: 'Engenharia digital especializada para produtos Web3 e IA.',
      services: 'Servicos',
      process: 'Processo',
      faq: 'FAQ',
      contact: 'Contato',
      copyright: 'Copyright 2026 GMX Labs',
    },
  },
}
