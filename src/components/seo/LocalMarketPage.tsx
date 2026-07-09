import Link from "next/link";

import Properties5Section from "@/components/properties/Properties5Section";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

type Faq = {
  question: string;
  answer: string;
};

type LocalMarketPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  serviceLabel: string;
  initialBusinessType: "Arriendo" | "Venta";
  basePath: string;
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta: {
    href: string;
    label: string;
  };
  highlights: string[];
  listingTitle: string;
  listingDescription: string;
  faqs: Faq[];
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function CtaLink({
  cta,
  className,
}: {
  cta: LocalMarketPageProps["primaryCta"];
  className: string;
}) {
  if (isExternalHref(cta.href)) {
    return (
      <a
        className={className}
        data-analytics-event="cta_click"
        data-analytics-location="local_market_hero"
        data-analytics-name={cta.label}
        href={cta.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link
      className={className}
      data-analytics-event="cta_click"
      data-analytics-location="local_market_hero"
      data-analytics-name={cta.label}
      href={cta.href}
    >
      {cta.label}
    </Link>
  );
}

export default function LocalMarketPage({
  eyebrow,
  title,
  description,
  serviceLabel,
  initialBusinessType,
  basePath,
  primaryCta,
  secondaryCta,
  highlights,
  listingTitle,
  listingDescription,
  faqs,
}: LocalMarketPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <LocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <main className="seo-market-page">
        <section className="seo-market-hero">
          <div className="seo-container seo-hero-grid">
            <div>
              <span className="seo-eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              <p>{description}</p>
              <div className="seo-actions">
                <CtaLink className="seo-primary-btn" cta={primaryCta} />
                <CtaLink className="seo-secondary-btn" cta={secondaryCta} />
              </div>
            </div>
            <aside className="seo-summary" aria-label="Resumen del servicio">
              <span>{serviceLabel}</span>
              <strong>Palmira, Valle del Cauca</strong>
              <ul>
                {highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="icon-CheckCircle" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="seo-content-band">
          <div className="seo-container seo-copy-grid">
            <div>
              <h2>Inmobiliaria local con respaldo legal</h2>
              <p>
                Legalio acompaña operaciones inmobiliarias en Palmira con una
                mezcla poco común: búsqueda comercial, gestión documental y
                asesoría jurídica. Nuestro objetivo es que compradores,
                arrendatarios y propietarios tomen decisiones con información
                clara, contratos bien revisados y soporte durante el proceso.
              </p>
            </div>
            <div>
              <h2>Por qué esta página responde mejor a tu búsqueda</h2>
              <p>
                Si buscas opciones en Palmira, no necesitas una lista genérica
                de Colombia. Aquí agrupamos inmuebles y acompañamiento enfocado
                en el mercado local de Palmira y municipios cercanos del Valle
                del Cauca.
              </p>
            </div>
          </div>
        </section>

        <section className="seo-listings">
          <div className="seo-container seo-listing-heading">
            <h2>{listingTitle}</h2>
            <p>{listingDescription}</p>
          </div>
          <Properties5Section
            initialCity="Palmira"
            initialBusinessType={initialBusinessType}
            basePath={basePath}
          />
        </section>

        <section className="seo-faq-section">
          <div className="seo-container">
            <h2>Preguntas frecuentes</h2>
            <div className="seo-faq-grid">
              {faqs.map((faq) => (
                <article key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .seo-market-page {
              --seo-primary: #031756;
              --seo-ink: #111827;
              --seo-muted: #4b5563;
              --seo-line: #d9dce6;
              --seo-soft: #f5f7fb;
              --seo-gold: #f7be2e;
              background: #ffffff;
              color: var(--seo-ink);
              font-size: 18px;
              line-height: 1.6;
            }

            .seo-container {
              width: min(100% - 40px, 1240px);
              margin: 0 auto;
            }

            .seo-market-hero {
              background: linear-gradient(135deg, #f8fafc 0%, #ffffff 58%, #fff5d8 100%);
              padding: 165px 0 76px;
            }

            .seo-hero-grid {
              align-items: center;
              display: grid;
              gap: 48px;
              grid-template-columns: minmax(0, 1.2fr) minmax(330px, 0.8fr);
            }

            .seo-eyebrow {
              color: #5c4300;
              display: inline-flex;
              font-size: 14px;
              font-weight: 900;
              letter-spacing: 0.08em;
              margin-bottom: 18px;
              text-transform: uppercase;
            }

            .seo-market-page h1,
            .seo-market-page h2,
            .seo-market-page h3 {
              color: var(--seo-primary);
              letter-spacing: 0;
              margin: 0;
            }

            .seo-market-page h1 {
              font-size: clamp(42px, 5.5vw, 72px);
              font-weight: 900;
              line-height: 1.06;
              max-width: 880px;
            }

            .seo-market-hero p {
              color: var(--seo-muted);
              font-size: 21px;
              line-height: 1.72;
              margin: 26px 0 0;
              max-width: 760px;
            }

            .seo-actions {
              display: flex;
              flex-wrap: wrap;
              gap: 14px;
              margin-top: 34px;
            }

            .seo-primary-btn,
            .seo-secondary-btn {
              align-items: center;
              border-radius: 10px;
              display: inline-flex;
              font-size: 17px;
              font-weight: 900;
              justify-content: center;
              min-height: 56px;
              padding: 15px 24px;
              text-decoration: none;
            }

            .seo-primary-btn {
              background: var(--seo-primary);
              color: #ffffff !important;
            }

            .seo-secondary-btn {
              background: #ffffff;
              border: 1px solid var(--seo-line);
              color: var(--seo-primary) !important;
            }

            .seo-summary {
              background: rgba(255, 255, 255, 0.86);
              border: 1px solid rgba(3, 23, 86, 0.1);
              border-radius: 14px;
              box-shadow: 0 18px 48px rgba(3, 23, 86, 0.1);
              padding: 30px;
            }

            .seo-summary > span {
              color: #5c4300;
              display: block;
              font-size: 14px;
              font-weight: 900;
              letter-spacing: 0.08em;
              margin-bottom: 8px;
              text-transform: uppercase;
            }

            .seo-summary strong {
              color: var(--seo-primary);
              display: block;
              font-size: 28px;
              line-height: 1.2;
              margin-bottom: 24px;
            }

            .seo-summary ul {
              display: grid;
              gap: 14px;
              list-style: none;
              margin: 0;
              padding: 0;
            }

            .seo-summary li {
              align-items: flex-start;
              color: var(--seo-muted);
              display: flex;
              gap: 10px;
              font-weight: 700;
            }

            .seo-summary li span {
              color: #15803d;
              flex: 0 0 auto;
              margin-top: 5px;
            }

            .seo-content-band,
            .seo-faq-section {
              background: var(--seo-soft);
              padding: 72px 0;
            }

            .seo-copy-grid {
              display: grid;
              gap: 44px;
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .seo-market-page h2 {
              font-size: clamp(30px, 3.2vw, 44px);
              font-weight: 900;
              line-height: 1.15;
              margin-bottom: 18px;
            }

            .seo-market-page h3 {
              font-size: 22px;
              font-weight: 900;
              line-height: 1.25;
              margin-bottom: 10px;
            }

            .seo-market-page p {
              color: var(--seo-muted);
              margin: 0;
            }

            .seo-listings {
              background: #ffffff;
              padding: 76px 0 0;
            }

            .seo-listing-heading {
              margin-bottom: 28px;
            }

            .seo-listing-heading p {
              max-width: 760px;
            }

            .seo-listings .main-content {
              padding-top: 0;
            }

            .seo-listings .box-title .breadcrumb {
              display: none;
            }

            .seo-faq-grid {
              display: grid;
              gap: 18px;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              margin-top: 28px;
            }

            .seo-faq-grid article {
              background: #ffffff;
              border: 1px solid var(--seo-line);
              border-radius: 12px;
              padding: 26px;
            }

            @media (max-width: 1000px) {
              .seo-hero-grid,
              .seo-copy-grid,
              .seo-faq-grid {
                grid-template-columns: 1fr;
              }

              .seo-market-hero {
                padding-top: 132px;
              }
            }

            @media (max-width: 640px) {
              .seo-container {
                width: min(100% - 28px, 1240px);
              }

              .seo-market-page h1 {
                font-size: 40px;
              }

              .seo-market-hero p {
                font-size: 18px;
              }

              .seo-actions a {
                width: 100%;
              }
            }
          `,
        }}
      />
    </>
  );
}
