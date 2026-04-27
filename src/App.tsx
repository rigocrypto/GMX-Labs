import './App.css'
import Logo from './components/Logo'

const services = [
  {
    accent: 'service-card-blue',
    icon: 'W',
    title: 'Web2 Development',
    description: 'Robust, scalable, and secure web applications tailored to your business goals.',
    points: ['Custom Web Applications', 'SaaS Platforms', 'APIs and Integrations', 'Cloud and DevOps'],
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
  },
]

const process = [
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
]

const whyChooseUs = [
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
]

const industries = ['Startups', 'Enterprises', 'Fintech', 'DeFi and Web3', 'E-commerce', 'AI and Data']

const faqItems = [
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
]

const portfolio = [
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
]

function App() {
  return (
    <div className="gmx-page">
      <div className="bg-mesh" aria-hidden="true" />

      <header className="gmx-header">
        <a className="gmx-brand" href="#top" aria-label="GMX Labs home">
          <Logo size="sm" />
          <span>GMX LABS</span>
        </a>
        <nav className="gmx-nav" aria-label="Primary">
          <a href="#services" className="active">Services</a>
          <a href="#solutions">Solutions</a>
          <a href="#process">Process</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">About Us</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn nav-cta" href="https://calendly.com/YOUR_CALENDLY_LINK">
          Let&apos;s Talk
        </a>
      </header>

      <main id="top" className="gmx-main">
        <section className="hero-section reveal" id="solutions">
          <div className="hero-copy-col">
            <p className="eyebrow-pill">Build. Innovate. Scale.</p>
            <h1>
              Digital Solutions for Web2, <span className="accent-text">Web3 and AI</span>
            </h1>
            <p>
              We deliver Web3 development, DeFi development, smart contract development, blockchain
              integration services, and AI automation solutions that drive measurable business growth.
            </p>

            <ul className="trust-points" aria-label="Trust points">
              <li>Modern Technologies</li>
              <li>Scalable Architecture</li>
              <li>Security First</li>
            </ul>

            <div className="hero-ctas">
              <a className="btn btn-primary" href="#services">
                Explore Solutions
              </a>
              <a className="btn btn-secondary" href="https://calendly.com/YOUR_CALENDLY_LINK">
                Book Strategy Call
              </a>
            </div>
          </div>

          <div className="hero-visual-col" aria-hidden="true">
            <div className="stack-surface" />
            <div className="stack-card stack-web2">Web2</div>
            <div className="stack-card stack-web3">Web3</div>
            <div className="stack-card stack-ai">AI</div>
          </div>
        </section>

        <section id="services" className="section reveal">
          <p className="section-eyebrow">What We Do</p>
          <h2>Our Services</h2>
          <p className="section-subtitle">
            End-to-end crypto product development across Web2, Web3, smart contracts, DeFi platforms,
            blockchain solutions, and AI automation.
          </p>

          <div className="services-grid">
            {services.map((service) => (
              <article className={`service-card ${service.accent}`} key={service.title}>
                <div className="service-icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <a href="#contact" className="btn btn-ghost" aria-label={`Learn more about ${service.title}`}>
                  Get Scope
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section reveal">
          <p className="section-eyebrow">Our Process</p>
          <h2>How We Work</h2>
          <p className="section-subtitle">
            A proven process to turn your ideas into powerful digital products.
          </p>

          <div className="process-row">
            {process.map((step) => (
              <article className="process-step" key={step.title}>
                <div className="step-icon" aria-hidden="true">{step.icon}</div>
                <h3>
                  {step.number} {step.title}
                </h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section reveal">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2>
            Why Clients Choose <span className="accent-text">GMX Labs</span>
          </h2>

          <div className="why-grid">
            {whyChooseUs.map((item) => (
              <article className="why-card" key={item.title}>
                <div className="why-icon" aria-hidden="true">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal">
          <p className="section-eyebrow">Industries We Serve</p>
          <h2>Who We Help</h2>
          <div className="pill-row">
            {industries.map((industry) => (
              <span className="industry-pill" key={industry}>
                {industry}
              </span>
            ))}
          </div>
          <p className="section-subtitle industries-note">
            From early-stage startups to global enterprises, we build solutions that scale.
          </p>
        </section>

        <section className="section reveal" id="portfolio">
          <p className="section-eyebrow">Featured Work</p>
          <h2>Portfolio Highlights</h2>
          <div className="portfolio-grid">
            {portfolio.map((item) => (
              <article className="portfolio-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="faq" aria-labelledby="faq-title">
          <p className="section-eyebrow">DeFi and Web3 Development FAQs</p>
          <h2 id="faq-title">Questions Founders Ask Before Building</h2>
          <p className="section-subtitle">
            Clear answers for teams planning Web3 app development, smart contract audits, and AI-enabled
            blockchain products.
          </p>
          <div className="faq-grid">
            {faqItems.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta-section reveal" id="contact">
          <div className="cta-copy">
            <h2>
              Ready to build something <span className="accent-text">amazing</span>?
            </h2>
            <p>Let&apos;s turn your idea into a high-impact digital product with a clear delivery roadmap.</p>
            <p className="cta-trust">Trusted by DeFi founders, fintech teams, and Web3 product builders.</p>
            <div className="cta-actions">
              <a className="btn btn-primary" href="mailto:hello@gmxlabs.example">
                Start Your Project
              </a>
              <a className="btn btn-secondary" href="https://calendly.com/YOUR_CALENDLY_LINK">
                Schedule Discovery Call
              </a>
            </div>
          </div>

          <div className="cta-stats" aria-label="Company stats">
            <div>
              <strong>50+</strong>
              <span>Projects Delivered</span>
            </div>
            <div>
              <strong>30+</strong>
              <span>Happy Clients</span>
            </div>
            <div>
              <strong>4+</strong>
              <span>Years Experience</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="gmx-footer">
        <div>
          <p className="footer-brand">GMX Labs</p>
          <p>Digital solutions across Web2, Web3, and AI.</p>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <a href="mailto:hello@gmxlabs.example">hello@gmxlabs.example</a>
          <p>Copyright 2026 GMX Labs</p>
        </div>
      </footer>
    </div>
  )
}

export default App
