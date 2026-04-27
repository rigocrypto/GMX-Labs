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
  es: 'Espanol',
  fr: 'Francais',
  pt: 'Portugues',
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
}

type FaqItem = {
  question: string
  answer: string
}

type StatItem = {
  value: string
  label: string
}

type Translation = {
  brand: {
    label: string
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
  industries: {
    eyebrow: string
    title: string
    items: string[]
    note: string
  }
  portfolio: {
    eyebrow: string
    title: string
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
      eyebrow: 'Build. Innovate. Scale.',
      titleLead: 'Digital Solutions for Web2,',
      titleAccent: 'Web3 and AI',
      description:
        'We deliver Web3 development, DeFi development, smart contract development, blockchain integration services, and AI automation solutions that drive measurable business growth.',
      trustAriaLabel: 'Trust points',
      trustPoints: ['Modern Technologies', 'Scalable Architecture', 'Security First'],
      primaryCta: 'Explore Solutions',
      secondaryCta: 'Book Strategy Call',
      stackCards: ['Web2', 'Web3', 'AI'],
    },
    services: {
      eyebrow: 'What We Do',
      title: 'Our Services',
      subtitle:
        'End-to-end crypto product development across Web2, Web3, smart contracts, DeFi platforms, blockchain solutions, and AI automation.',
      learnMoreAriaPrefix: 'Learn more about',
      items: [
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Web2 Development',
          description: 'Robust, scalable, and secure web applications tailored to your business goals.',
          points: ['Custom Web Applications', 'SaaS Platforms', 'APIs and Integrations', 'Cloud and DevOps'],
          ctaLabel: 'Get Scope',
        },
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Web3 and Blockchain',
          description:
            'Decentralized solutions and blockchain integrations for the next generation of internet products.',
          points: [
            'dApps Development',
            'Smart Contracts',
            'DeFi Solutions',
            'NFT and Tokenization',
            'Wallet and dApp Integration',
          ],
          ctaLabel: 'Get Scope',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'AI and Automation',
          description: 'Intelligent systems that automate workflows, extract insights, and accelerate growth.',
          points: [
            'AI-Powered Applications',
            'Machine Learning Models',
            'Chatbots and NLP',
            'Data Analytics and Insights',
            'Automation and Workflows',
          ],
          ctaLabel: 'Get Scope',
        },
      ],
    },
    process: {
      eyebrow: 'Our Process',
      title: 'How We Work',
      subtitle: 'A proven process to turn your ideas into powerful digital products.',
      steps: [
        {
          number: '1.',
          icon: '💡',
          title: 'Discover',
          text: 'We understand your goals, audience, and product context.',
        },
        {
          number: '2.',
          icon: '✍️',
          title: 'Plan',
          text: 'We define architecture, milestones, and a practical roadmap.',
        },
        {
          number: '3.',
          icon: '</>',
          title: 'Build',
          text: 'We develop, test, and integrate with performance and quality in mind.',
        },
        {
          number: '4.',
          icon: '🚀',
          title: 'Launch',
          text: 'We deploy your solution and ensure a stable go-live experience.',
        },
        {
          number: '5.',
          icon: '📈',
          title: 'Grow',
          text: 'We optimize, iterate, and support your long-term product growth.',
        },
      ],
    },
    why: {
      eyebrow: 'Why Choose Us',
      titleLead: 'Why Clients Choose',
      titleAccent: 'GMX Labs',
      items: [
        {
          icon: '🛡️',
          title: 'Expert Team',
          text: 'Skilled engineers and architects with deep delivery experience.',
        },
        {
          icon: '⚡',
          title: 'Modern Stack',
          text: 'Latest technologies to deliver resilient, future-ready products.',
        },
        {
          icon: '🔒',
          title: 'Secure by Design',
          text: 'Security and performance are engineered into every layer.',
        },
        {
          icon: '📊',
          title: 'Results Driven',
          text: 'Focused on measurable outcomes and long-term business value.',
        },
      ],
    },
    industries: {
      eyebrow: 'Industries We Serve',
      title: 'Who We Help',
      items: ['Startups', 'Enterprises', 'Fintech', 'DeFi and Web3', 'E-commerce', 'AI and Data'],
      note: 'From early-stage startups to global enterprises, we build solutions that scale.',
    },
    portfolio: {
      eyebrow: 'Featured Work',
      title: 'Portfolio Highlights',
      items: [
        {
          title: 'DeFi Trading Intelligence',
          text: 'Analytics dashboards and market intelligence workflows for DeFi protocol teams.',
        },
        {
          title: 'Tokenized Asset Platform',
          text: 'Smart contract architecture and secure blockchain integration for tokenized ecosystems.',
        },
        {
          title: 'AI Operations Engine',
          text: 'AI automation pipelines for faster delivery and resilient crypto product operations.',
        },
      ],
    },
    faq: {
      eyebrow: 'DeFi and Web3 Development FAQs',
      title: 'Questions Founders Ask Before Building',
      subtitle:
        'Clear answers for teams planning Web3 app development, smart contract audits, and AI-enabled blockchain products.',
      items: [
        {
          question: 'What does a DeFi development agency do?',
          answer:
            'A DeFi development agency designs, builds, and deploys decentralized finance products such as trading platforms, staking systems, lending modules, and protocol dashboards.',
        },
        {
          question: 'How much does smart contract development cost?',
          answer:
            'Smart contract development cost depends on scope, chain complexity, and testing depth. Typical projects range from focused MVP contracts to full production-grade contract suites.',
        },
        {
          question: 'What is included in a smart contract audit?',
          answer:
            'Smart contract audit services usually include code review, threat modeling, vulnerability testing, exploit simulation, and a prioritized remediation report for your engineering team.',
        },
        {
          question: 'How long does it take to build a Web3 app?',
          answer:
            'A focused Web3 MVP can often launch in weeks, while larger dApp development programs require phased delivery across architecture, development, testing, and deployment.',
        },
        {
          question: 'Can you integrate AI into blockchain products?',
          answer:
            'Yes. We build AI automation solutions for on-chain analytics, risk monitoring, workflow automation, and intelligent product operations layered on blockchain systems.',
        },
      ],
    },
    cta: {
      titleLead: 'Ready to build something',
      titleAccent: 'amazing',
      titleTail: '?',
      description: 'Let\'s turn your idea into a high-impact digital product with a clear delivery roadmap.',
      trust: 'Trusted by DeFi founders, fintech teams, and Web3 product builders.',
      primaryCta: 'Start Your Project',
      secondaryCta: 'Schedule Discovery Call',
      statsAriaLabel: 'Company stats',
      stats: [
        { value: '50+', label: 'Projects Delivered' },
        { value: '30+', label: 'Happy Clients' },
        { value: '4+', label: 'Years Experience' },
      ],
    },
    footer: {
      description: 'Digital solutions across Web2, Web3, and AI.',
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
      eyebrow: 'Construir. Innovar. Escalar.',
      titleLead: 'Soluciones digitales para Web2,',
      titleAccent: 'Web3 e IA',
      description:
        'Entregamos desarrollo Web3, soluciones DeFi, desarrollo de smart contracts, integraciones blockchain y automatizacion con IA que impulsan un crecimiento medible.',
      trustAriaLabel: 'Puntos de confianza',
      trustPoints: ['Tecnologia moderna', 'Arquitectura escalable', 'Seguridad primero'],
      primaryCta: 'Explorar soluciones',
      secondaryCta: 'Reservar llamada',
      stackCards: ['Web2', 'Web3', 'IA'],
    },
    services: {
      eyebrow: 'Lo Que Hacemos',
      title: 'Nuestros Servicios',
      subtitle:
        'Desarrollo integral de productos digitales en Web2, Web3, smart contracts, plataformas DeFi, soluciones blockchain y automatizacion con IA.',
      learnMoreAriaPrefix: 'Conocer mas sobre',
      items: [
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Desarrollo Web2',
          description: 'Aplicaciones web robustas, escalables y seguras alineadas con tus objetivos de negocio.',
          points: ['Aplicaciones web a medida', 'Plataformas SaaS', 'APIs e integraciones', 'Cloud y DevOps'],
          ctaLabel: 'Solicitar alcance',
        },
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Web3 y Blockchain',
          description: 'Soluciones descentralizadas e integraciones blockchain para la nueva generacion de productos de internet.',
          points: [
            'Desarrollo de dApps',
            'Smart Contracts',
            'Soluciones DeFi',
            'NFT y tokenizacion',
            'Integracion de wallets y dApps',
          ],
          ctaLabel: 'Solicitar alcance',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'IA y Automatizacion',
          description: 'Sistemas inteligentes que automatizan flujos, extraen insights y aceleran el crecimiento.',
          points: [
            'Aplicaciones impulsadas por IA',
            'Modelos de machine learning',
            'Chatbots y NLP',
            'Analitica e insights',
            'Automatizacion y workflows',
          ],
          ctaLabel: 'Solicitar alcance',
        },
      ],
    },
    process: {
      eyebrow: 'Nuestro Proceso',
      title: 'Como Trabajamos',
      subtitle: 'Un proceso probado para convertir tus ideas en productos digitales potentes.',
      steps: [
        {
          number: '1.',
          icon: '💡',
          title: 'Descubrir',
          text: 'Entendemos tus objetivos, tu audiencia y el contexto real del producto.',
        },
        {
          number: '2.',
          icon: '✍️',
          title: 'Planificar',
          text: 'Definimos arquitectura, hitos y una hoja de ruta realista.',
        },
        {
          number: '3.',
          icon: '</>',
          title: 'Construir',
          text: 'Desarrollamos, probamos e integramos con foco en rendimiento y calidad.',
        },
        {
          number: '4.',
          icon: '🚀',
          title: 'Lanzar',
          text: 'Desplegamos tu solucion y aseguramos una salida a produccion estable.',
        },
        {
          number: '5.',
          icon: '📈',
          title: 'Escalar',
          text: 'Optimizamos, iteramos y apoyamos el crecimiento de largo plazo.',
        },
      ],
    },
    why: {
      eyebrow: 'Por Que Elegirnos',
      titleLead: 'Por Que Los Clientes Eligen',
      titleAccent: 'GMX Labs',
      items: [
        {
          icon: '🛡️',
          title: 'Equipo experto',
          text: 'Ingenieros y arquitectos con amplia experiencia real de entrega.',
        },
        {
          icon: '⚡',
          title: 'Stack moderno',
          text: 'Tecnologias actuales para productos resilientes y preparados para el futuro.',
        },
        {
          icon: '🔒',
          title: 'Seguridad desde el diseno',
          text: 'La seguridad y el rendimiento se construyen en cada capa.',
        },
        {
          icon: '📊',
          title: 'Orientados a resultados',
          text: 'Enfocados en resultados medibles y valor de negocio duradero.',
        },
      ],
    },
    industries: {
      eyebrow: 'Industrias Que Atendemos',
      title: 'A Quien Ayudamos',
      items: ['Startups', 'Empresas', 'Fintech', 'DeFi y Web3', 'E-commerce', 'IA y Datos'],
      note: 'Desde startups tempranas hasta empresas globales, construimos soluciones listas para escalar.',
    },
    portfolio: {
      eyebrow: 'Trabajo Destacado',
      title: 'Portafolio Destacado',
      items: [
        {
          title: 'Inteligencia para Trading DeFi',
          text: 'Dashboards analiticos y flujos de inteligencia de mercado para equipos de protocolos DeFi.',
        },
        {
          title: 'Plataforma de activos tokenizados',
          text: 'Arquitectura de smart contracts e integracion segura para ecosistemas tokenizados.',
        },
        {
          title: 'Motor operativo con IA',
          text: 'Pipelines de automatizacion con IA para una operacion cripto mas rapida y resistente.',
        },
      ],
    },
    faq: {
      eyebrow: 'Preguntas Frecuentes DeFi y Web3',
      title: 'Preguntas Que Los Fundadores Hacen Antes de Construir',
      subtitle:
        'Respuestas claras para equipos que planean desarrollo Web3, auditorias de smart contracts y productos blockchain con IA.',
      items: [
        {
          question: 'Que hace una agencia de desarrollo DeFi?',
          answer:
            'Una agencia DeFi disena, construye y despliega productos financieros descentralizados como plataformas de trading, sistemas de staking, modulos de lending y dashboards de protocolos.',
        },
        {
          question: 'Cuanto cuesta desarrollar smart contracts?',
          answer:
            'El costo depende del alcance, la complejidad de la cadena y la profundidad del testing. Los proyectos van desde MVPs enfocados hasta suites completas de contratos para produccion.',
        },
        {
          question: 'Que incluye una auditoria de smart contracts?',
          answer:
            'Normalmente incluye revision de codigo, modelado de amenazas, pruebas de vulnerabilidades, simulacion de exploits y un reporte priorizado para tu equipo de ingenieria.',
        },
        {
          question: 'Cuanto tarda construir una app Web3?',
          answer:
            'Un MVP Web3 enfocado puede lanzarse en semanas, mientras que programas mas grandes requieren entregas por fases en arquitectura, desarrollo, testing y despliegue.',
        },
        {
          question: 'Pueden integrar IA en productos blockchain?',
          answer:
            'Si. Construimos automatizacion con IA para analitica on-chain, monitoreo de riesgo, automatizacion de workflows y operaciones inteligentes sobre sistemas blockchain.',
        },
      ],
    },
    cta: {
      titleLead: 'Listo para construir algo',
      titleAccent: 'increible',
      titleTail: '?',
      description: 'Convirtamos tu idea en un producto digital de alto impacto con una hoja de ruta clara.',
      trust: 'Con la confianza de fundadores DeFi, equipos fintech y builders Web3.',
      primaryCta: 'Iniciar proyecto',
      secondaryCta: 'Agendar discovery call',
      statsAriaLabel: 'Metricas de la compania',
      stats: [
        { value: '50+', label: 'Proyectos entregados' },
        { value: '30+', label: 'Clientes satisfechos' },
        { value: '4+', label: 'Anos de experiencia' },
      ],
    },
    footer: {
      description: 'Soluciones digitales en Web2, Web3 e IA.',
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
      eyebrow: 'Construire. Innover. Evoluer.',
      titleLead: 'Solutions numeriques pour le Web2,',
      titleAccent: 'le Web3 et l IA',
      description:
        'Nous livrons des solutions Web3, DeFi, smart contracts, integrations blockchain et automatisation IA qui accelerent une croissance mesurable.',
      trustAriaLabel: 'Points de confiance',
      trustPoints: ['Technologies modernes', 'Architecture evolutive', 'Securite avant tout'],
      primaryCta: 'Explorer les solutions',
      secondaryCta: 'Reserver un appel',
      stackCards: ['Web2', 'Web3', 'IA'],
    },
    services: {
      eyebrow: 'Ce Que Nous Faisons',
      title: 'Nos Services',
      subtitle:
        'Developpement produit de bout en bout pour le Web2, le Web3, les smart contracts, les plateformes DeFi, les solutions blockchain et l automatisation IA.',
      learnMoreAriaPrefix: 'En savoir plus sur',
      items: [
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Developpement Web2',
          description: 'Applications web robustes, evolutives et securisees alignees sur vos objectifs business.',
          points: ['Applications web sur mesure', 'Plateformes SaaS', 'APIs et integrations', 'Cloud et DevOps'],
          ctaLabel: 'Definir le scope',
        },
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Web3 et Blockchain',
          description: 'Solutions decentralisees et integrations blockchain pour la nouvelle generation de produits internet.',
          points: [
            'Developpement de dApps',
            'Smart Contracts',
            'Solutions DeFi',
            'NFT et tokenisation',
            'Integration wallet et dApp',
          ],
          ctaLabel: 'Definir le scope',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'IA et Automatisation',
          description: 'Systemes intelligents qui automatisent les flux, extraient des insights et accelerent la croissance.',
          points: [
            'Applications basees sur l IA',
            'Modeles de machine learning',
            'Chatbots et NLP',
            'Analyse et insights',
            'Automatisation et workflows',
          ],
          ctaLabel: 'Definir le scope',
        },
      ],
    },
    process: {
      eyebrow: 'Notre Processus',
      title: 'Comment Nous Travaillons',
      subtitle: 'Un processus eprouve pour transformer vos idees en produits numeriques puissants.',
      steps: [
        {
          number: '1.',
          icon: '💡',
          title: 'Decouvrir',
          text: 'Nous comprenons vos objectifs, votre audience et le contexte du produit.',
        },
        {
          number: '2.',
          icon: '✍️',
          title: 'Planifier',
          text: 'Nous definissons l architecture, les jalons et une feuille de route realiste.',
        },
        {
          number: '3.',
          icon: '</>',
          title: 'Construire',
          text: 'Nous developpons, testons et integrons avec un haut niveau de qualite.',
        },
        {
          number: '4.',
          icon: '🚀',
          title: 'Lancer',
          text: 'Nous deployeeons votre solution et securisons une mise en ligne stable.',
        },
        {
          number: '5.',
          icon: '📈',
          title: 'Faire evoluer',
          text: 'Nous optimisons, iterons et accompagnons la croissance du produit sur le long terme.',
        },
      ],
    },
    why: {
      eyebrow: 'Pourquoi Nous Choisir',
      titleLead: 'Pourquoi Les Clients Choisissent',
      titleAccent: 'GMX Labs',
      items: [
        {
          icon: '🛡️',
          title: 'Equipe experte',
          text: 'Ingenieurs et architectes experimentes avec une forte culture de delivery.',
        },
        {
          icon: '⚡',
          title: 'Stack moderne',
          text: 'Des technologies recentes pour des produits resilients et durables.',
        },
        {
          icon: '🔒',
          title: 'Securite des la conception',
          text: 'La securite et la performance sont integrees a chaque couche.',
        },
        {
          icon: '📊',
          title: 'Orientes resultats',
          text: 'Focalises sur les resultats mesurables et la valeur business long terme.',
        },
      ],
    },
    industries: {
      eyebrow: 'Secteurs Couverts',
      title: 'Qui Nous Aidons',
      items: ['Startups', 'Entreprises', 'Fintech', 'DeFi et Web3', 'E-commerce', 'IA et Donnees'],
      note: 'Des startups en amorcage aux grandes entreprises, nous construisons des solutions concues pour evoluer.',
    },
    portfolio: {
      eyebrow: 'Projets Mis En Avant',
      title: 'Highlights Portfolio',
      items: [
        {
          title: 'Intelligence de trading DeFi',
          text: 'Tableaux de bord analytiques et workflows d intelligence de marche pour les equipes DeFi.',
        },
        {
          title: 'Plateforme d actifs tokenises',
          text: 'Architecture smart contracts et integration blockchain securisee pour des ecosystemes tokenises.',
        },
        {
          title: 'Moteur operations IA',
          text: 'Pipelines d automatisation IA pour accelerer la livraison et fiabiliser les operations crypto.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ DeFi et Web3',
      title: 'Questions Que Les Fondateurs Posent Avant De Construire',
      subtitle:
        'Des reponses claires pour les equipes qui preparant un produit Web3, un audit de smart contracts ou une solution blockchain avec IA.',
      items: [
        {
          question: 'Que fait une agence de developpement DeFi ?',
          answer:
            'Une agence DeFi concoit, developpe et deploie des produits decentralises comme des plateformes de trading, des systemes de staking, des modules de lending et des dashboards protocolaires.',
        },
        {
          question: 'Combien coute le developpement de smart contracts ?',
          answer:
            'Le cout depend du perimetre, de la complexite de la chaine et du niveau de tests. Les projets vont d un MVP cible a une suite complete de contrats prete pour la production.',
        },
        {
          question: 'Que comprend un audit de smart contracts ?',
          answer:
            'En general : revue de code, modelisation des menaces, tests de vulnerabilite, simulation d exploits et rapport de remediation priorise pour votre equipe technique.',
        },
        {
          question: 'Combien de temps faut-il pour construire une app Web3 ?',
          answer:
            'Un MVP Web3 cible peut etre lance en quelques semaines, tandis que des programmes plus vastes exigent une livraison par phases en architecture, developpement, tests et deploiement.',
        },
        {
          question: 'Pouvez-vous integrer l IA dans des produits blockchain ?',
          answer:
            'Oui. Nous construisons des solutions d automatisation IA pour l analytique on-chain, le monitoring du risque, l automatisation des workflows et les operations produit intelligentes.',
        },
      ],
    },
    cta: {
      titleLead: 'Pret a construire quelque chose de',
      titleAccent: 'fort',
      titleTail: '?',
      description: 'Transformons votre idee en produit numerique a fort impact avec une feuille de route claire.',
      trust: 'Adopte par des fondateurs DeFi, des equipes fintech et des builders Web3.',
      primaryCta: 'Demarrer votre projet',
      secondaryCta: 'Planifier un appel',
      statsAriaLabel: 'Indicateurs de l entreprise',
      stats: [
        { value: '50+', label: 'Projets livres' },
        { value: '30+', label: 'Clients satisfaits' },
        { value: '4+', label: 'Ans d experience' },
      ],
    },
    footer: {
      description: 'Solutions numeriques pour le Web2, le Web3 et l IA.',
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
      eyebrow: 'Construir. Inovar. Escalar.',
      titleLead: 'Solucoes digitais para Web2,',
      titleAccent: 'Web3 e IA',
      description:
        'Entregamos desenvolvimento Web3, solucoes DeFi, smart contracts, integracoes blockchain e automacao com IA para gerar crescimento mensuravel.',
      trustAriaLabel: 'Pontos de confianca',
      trustPoints: ['Tecnologias modernas', 'Arquitetura escalavel', 'Seguranca primeiro'],
      primaryCta: 'Explorar solucoes',
      secondaryCta: 'Agendar chamada',
      stackCards: ['Web2', 'Web3', 'IA'],
    },
    services: {
      eyebrow: 'O Que Fazemos',
      title: 'Nossos Servicos',
      subtitle:
        'Desenvolvimento completo de produtos para Web2, Web3, smart contracts, plataformas DeFi, solucoes blockchain e automacao com IA.',
      learnMoreAriaPrefix: 'Saiba mais sobre',
      items: [
        {
          accent: 'service-card-blue',
          icon: 'W',
          title: 'Desenvolvimento Web2',
          description: 'Aplicacoes web robustas, escalaveis e seguras alinhadas aos objetivos do seu negocio.',
          points: ['Aplicacoes web sob medida', 'Plataformas SaaS', 'APIs e integracoes', 'Cloud e DevOps'],
          ctaLabel: 'Definir escopo',
        },
        {
          accent: 'service-card-purple',
          icon: 'B',
          title: 'Web3 e Blockchain',
          description: 'Solucoes descentralizadas e integracoes blockchain para a nova geracao de produtos digitais.',
          points: [
            'Desenvolvimento de dApps',
            'Smart Contracts',
            'Solucoes DeFi',
            'NFTs e tokenizacao',
            'Integracao de wallets e dApps',
          ],
          ctaLabel: 'Definir escopo',
        },
        {
          accent: 'service-card-cyan',
          icon: 'A',
          title: 'IA e Automacao',
          description: 'Sistemas inteligentes que automatizam fluxos, extraem insights e aceleram resultados.',
          points: [
            'Aplicacoes com IA',
            'Modelos de machine learning',
            'Chatbots e NLP',
            'Analytics e insights',
            'Automacao e workflows',
          ],
          ctaLabel: 'Definir escopo',
        },
      ],
    },
    process: {
      eyebrow: 'Nosso Processo',
      title: 'Como Trabalhamos',
      subtitle: 'Um processo comprovado para transformar ideias em produtos digitais de alto impacto.',
      steps: [
        {
          number: '1.',
          icon: '💡',
          title: 'Descobrir',
          text: 'Entendemos seus objetivos, publico e contexto real do produto.',
        },
        {
          number: '2.',
          icon: '✍️',
          title: 'Planejar',
          text: 'Definimos arquitetura, marcos e um roadmap pratico.',
        },
        {
          number: '3.',
          icon: '</>',
          title: 'Construir',
          text: 'Desenvolvemos, testamos e integramos com foco em performance e qualidade.',
        },
        {
          number: '4.',
          icon: '🚀',
          title: 'Lancar',
          text: 'Publicamos sua solucao e garantimos uma entrada em producao estavel.',
        },
        {
          number: '5.',
          icon: '📈',
          title: 'Crescer',
          text: 'Otimizamos, iteramos e apoiamos o crescimento de longo prazo do produto.',
        },
      ],
    },
    why: {
      eyebrow: 'Por Que Nos Escolher',
      titleLead: 'Por Que Os Clientes Escolhem',
      titleAccent: 'GMX Labs',
      items: [
        {
          icon: '🛡️',
          title: 'Time experiente',
          text: 'Engenheiros e arquitetos com experiencia profunda em entrega real.',
        },
        {
          icon: '⚡',
          title: 'Stack moderno',
          text: 'Tecnologias atuais para produtos resilientes e preparados para o futuro.',
        },
        {
          icon: '🔒',
          title: 'Seguranca por design',
          text: 'Seguranca e performance sao construidas em cada camada.',
        },
        {
          icon: '📊',
          title: 'Foco em resultado',
          text: 'Orientados a resultados mensuraveis e valor de negocio duradouro.',
        },
      ],
    },
    industries: {
      eyebrow: 'Setores Atendidos',
      title: 'Quem Ajudamos',
      items: ['Startups', 'Empresas', 'Fintech', 'DeFi e Web3', 'E-commerce', 'IA e Dados'],
      note: 'De startups em fase inicial a empresas globais, criamos solucoes prontas para escalar.',
    },
    portfolio: {
      eyebrow: 'Trabalhos em Destaque',
      title: 'Destaques do Portfolio',
      items: [
        {
          title: 'Inteligencia para trading DeFi',
          text: 'Dashboards analiticos e fluxos de inteligencia de mercado para equipes de protocolos DeFi.',
        },
        {
          title: 'Plataforma de ativos tokenizados',
          text: 'Arquitetura de smart contracts e integracao blockchain segura para ecossistemas tokenizados.',
        },
        {
          title: 'Motor operacional com IA',
          text: 'Pipelines de automacao com IA para entregas mais rapidas e operacoes cripto resilientes.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ DeFi e Web3',
      title: 'Perguntas Que Fundadores Fazem Antes de Construir',
      subtitle:
        'Respostas claras para equipes que planejam produtos Web3, auditorias de smart contracts e solucoes blockchain com IA.',
      items: [
        {
          question: 'O que faz uma agencia de desenvolvimento DeFi?',
          answer:
            'Uma agencia DeFi projeta, desenvolve e implanta produtos financeiros descentralizados como plataformas de trading, sistemas de staking, modulos de emprestimo e dashboards de protocolo.',
        },
        {
          question: 'Quanto custa desenvolver smart contracts?',
          answer:
            'O custo depende do escopo, da complexidade da rede e da profundidade dos testes. Os projetos variam de MVPs enxutos a suites completas prontas para producao.',
        },
        {
          question: 'O que esta incluido em uma auditoria de smart contracts?',
          answer:
            'Normalmente inclui revisao de codigo, modelagem de ameacas, testes de vulnerabilidade, simulacao de exploits e um relatorio priorizado para sua equipe de engenharia.',
        },
        {
          question: 'Quanto tempo leva para construir um app Web3?',
          answer:
            'Um MVP Web3 focado pode ser lancado em semanas, enquanto programas maiores exigem entregas em fases de arquitetura, desenvolvimento, testes e deploy.',
        },
        {
          question: 'Vocês conseguem integrar IA em produtos blockchain?',
          answer:
            'Sim. Criamos automacao com IA para analytics on-chain, monitoramento de risco, automacao de workflows e operacoes inteligentes sobre sistemas blockchain.',
        },
      ],
    },
    cta: {
      titleLead: 'Pronto para construir algo',
      titleAccent: 'incrivel',
      titleTail: '?',
      description: 'Vamos transformar sua ideia em um produto digital de alto impacto com um roadmap claro.',
      trust: 'Confiado por fundadores DeFi, times fintech e builders Web3.',
      primaryCta: 'Comecar projeto',
      secondaryCta: 'Agendar discovery call',
      statsAriaLabel: 'Metricas da empresa',
      stats: [
        { value: '50+', label: 'Projetos entregues' },
        { value: '30+', label: 'Clientes satisfeitos' },
        { value: '4+', label: 'Anos de experiencia' },
      ],
    },
    footer: {
      description: 'Solucoes digitais em Web2, Web3 e IA.',
      services: 'Servicos',
      process: 'Processo',
      faq: 'FAQ',
      contact: 'Contato',
      copyright: 'Copyright 2026 GMX Labs',
    },
  },
}
