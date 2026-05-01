import './App.css'
import LanguageSwitcher from './components/LanguageSwitcher'
import Logo from './components/Logo'
import { useLanguage } from './hooks/useLanguage'

const CALENDLY_LINK = 'https://calendly.com/rigocrypto'
const CONTACT_MAILTO = 'mailto:rigovivas71@gmail.com?subject=Project%20Estimate%20Request'
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02'

function App() {
  const { language, setLanguage, t } = useLanguage()
  const services = [...t.services.items, ...t.services.additionalItems]

  return (
    <div className="gmx-page">
      <div className="bg-mesh" aria-hidden="true" />

      <header className="gmx-header">
        <a className="gmx-brand" href="#top" aria-label={t.brand.homeAriaLabel}>
          <Logo size="sm" />
          <span>{t.brand.label}</span>
        </a>
        <nav className="gmx-nav" aria-label={t.nav.primaryAriaLabel}>
          <a href="#services" className="active">
            {t.nav.services}
          </a>
          <a href="#solutions">{t.nav.solutions}</a>
          <a href="#process">{t.nav.process}</a>
          <a href="#portfolio">{t.nav.portfolio}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#faq">{t.nav.faq}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher
            language={language}
            label={t.nav.languageSwitcherLabel}
            onChange={setLanguage}
          />
          <a className="btn nav-cta" href={CALENDLY_LINK}>
            {t.nav.cta}
          </a>
        </div>
      </header>

      <main id="top" className="gmx-main">
        <section className="hero-section reveal" id="solutions">
          <div className="hero-copy-col">
            <p className="eyebrow-pill">{t.hero.eyebrow}</p>
            <p className="hero-brand-note">{t.brand.tagline}</p>
            <h1>
              {t.hero.titleLead} <span className="accent-text">{t.hero.titleAccent}</span>
            </h1>

            <div className="hero-video-wrap" aria-label={t.hero.videoAriaLabel}>
              <video
                className="hero-video"
                src={`${import.meta.env.BASE_URL}Web3-logo.mp4`}
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata"
              >
                {t.hero.videoFallback}
              </video>
            </div>

            <p>{t.hero.description}</p>

            <ul className="trust-points" aria-label={t.hero.trustAriaLabel}>
              {t.hero.trustPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="hero-ctas">
              <a className="btn btn-primary" href={CALENDLY_LINK}>
                {t.hero.primaryCta}
              </a>
              <a className="btn btn-secondary" href="#services">
                {t.hero.viewServicesCta}
              </a>
              <a
                className="btn btn-primary"
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.secureCheckoutCta}
              </a>
            </div>
            <p className="hero-disclaimer">{t.brand.disclaimer}</p>
          </div>

          <div className="hero-visual-col" aria-hidden="true">
            <div className="stack-surface" />
            <div className="stack-card stack-web2">{t.hero.stackCards[0]}</div>
            <div className="stack-card stack-web3">{t.hero.stackCards[1]}</div>
            <div className="stack-card stack-ai">{t.hero.stackCards[2]}</div>
            <div className="stack-card stack-blockchain">{t.hero.stackCards[3] ?? t.hero.blockchainLabel}</div>
          </div>
        </section>

        <section id="services" className="section reveal">
          <p className="section-eyebrow">{t.services.eyebrow}</p>
          <h2>{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>

          <div className="services-grid">
            {services.map((service) => (
              <article className={`service-card ${service.accent}`} key={`${language}-${service.title}`}>
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
                <a
                  href="#contact"
                  className="btn btn-ghost"
                  aria-label={`${t.services.learnMoreAriaPrefix} ${service.title}`}
                >
                  {service.ctaLabel}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="readiness">
          <p className="section-eyebrow">{t.readiness.eyebrow}</p>
          <h2>{t.readiness.title}</h2>
          <p className="section-subtitle">{t.readiness.subtitle}</p>
          <div className="why-grid">
            {t.readiness.items.map((item) => (
              <article className="why-card" key={`${language}-${item.title}`}>
                <div className="why-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section reveal">
          <p className="section-eyebrow">{t.process.eyebrow}</p>
          <h2>{t.process.title}</h2>
          <p className="section-subtitle">{t.process.subtitle}</p>

          <div className="process-row">
            {t.process.steps.map((step) => (
              <article className="process-step" key={`${language}-${step.title}`}>
                <div className="step-icon" aria-hidden="true">
                  {step.icon}
                </div>
                <h3>
                  {step.number} {step.title}
                </h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section reveal">
          <p className="section-eyebrow">{t.why.eyebrow}</p>
          <h2>
            {t.why.titleLead} <span className="accent-text">{t.why.titleAccent}</span>
          </h2>

          <div className="why-grid">
            {t.why.items.map((item) => (
              <article className="why-card" key={`${language}-${item.title}`}>
                <div className="why-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="stack">
          <p className="section-eyebrow">{t.tech.eyebrow}</p>
          <h2>{t.tech.title}</h2>
          <div className="stack-grid">
            {t.tech.categories.map((category) => (
              <article className="stack-category" key={`${language}-${category.label}`}>
                <h3>{category.label}</h3>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal">
          <p className="section-eyebrow">{t.industries.eyebrow}</p>
          <h2>{t.industries.title}</h2>
          <div className="pill-row">
            {t.industries.items.map((industry) => (
              <span className="industry-pill" key={`${language}-${industry}`}>
                {industry}
              </span>
            ))}
          </div>
          <p className="section-subtitle industries-note">{t.industries.note}</p>
        </section>

        <section className="section reveal" id="portfolio">
          <p className="section-eyebrow">{t.portfolio.eyebrow}</p>
          <h2>{t.portfolio.title}</h2>
          <div className="portfolio-grid">
            {t.portfolio.items.map((item) => (
              <article className="portfolio-card" key={`${language}-${item.title}`}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <p className="portfolio-meta">
                  <strong>{t.portfolio.stackLabel}</strong> {item.stack}
                </p>
                <p className="portfolio-meta">
                  <strong>{t.portfolio.impactLabel}</strong> {item.impact}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="faq" aria-labelledby="faq-title">
          <p className="section-eyebrow">{t.faq.eyebrow}</p>
          <h2 id="faq-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
          <div className="faq-grid">
            {t.faq.items.map((item) => (
              <details className="faq-item" key={`${language}-${item.question}`}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
            {t.faq.additionalItems.map((item) => (
              <details className="faq-item" key={`${language}-${item.question}`}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta-section reveal" id="pricing">
          <div className="cta-copy">
            <h2>
              {t.pricing.titleLead} <span className="accent-text">{t.pricing.titleAccent}</span>
              {t.pricing.titleTail}
            </h2>
            <p>{t.pricing.description}</p>
            <p className="cta-trust">{t.pricing.trust}</p>
            <div className="cta-actions">
              <a className="btn btn-primary" href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                {t.pricing.primaryCta}
              </a>
              <a className="btn btn-secondary" href={CALENDLY_LINK}>
                {t.pricing.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <section className="cta-section reveal" id="contact">
          <div className="cta-copy">
            <h2>
              {t.cta.titleLead} <span className="accent-text">{t.cta.titleAccent}</span>
              {t.cta.titleTail}
            </h2>
            <p>{t.cta.description}</p>
            <p className="cta-trust">{t.cta.trust}</p>
            <div className="cta-actions">
              <a className="btn btn-primary" href={CALENDLY_LINK}>
                {t.cta.primaryCta}
              </a>
              <a className="btn btn-secondary" href={CONTACT_MAILTO}>
                {t.cta.secondaryCta}
              </a>
              <a className="btn btn-primary" href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                {t.cta.payCta}
              </a>
            </div>
          </div>

          <div className="cta-stats" aria-label={t.cta.statsAriaLabel}>
            {t.cta.stats.map((stat) => (
              <div key={`${language}-${stat.label}`}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="gmx-footer">
        <div>
          <p className="footer-brand">{t.brand.label}</p>
          <p>{t.footer.description}</p>
        </div>
        <div className="footer-links">
          <a href="#services">{t.footer.services}</a>
          <a href="#process">{t.footer.process}</a>
          <a href="#pricing">{t.footer.pricing}</a>
          <a href="#faq">{t.footer.faq}</a>
          <a href="#contact">{t.footer.contact}</a>
        </div>
        <div>
          <a href="mailto:rigovivas71@gmail.com">rigovivas71@gmail.com</a>
          <p>
            <a href={CALENDLY_LINK}>{t.footer.bookCalendly}</a> |{' '}
            <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
              {t.footer.secureStripeCheckout}
            </a>
          </p>
          <p className="footer-disclaimer">{t.brand.disclaimer}</p>
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
