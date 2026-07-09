import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | Legalio",
  description:
    "La página que buscas no está disponible. Encuentra propiedades, arriendos, ventas o contacta a Legalio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-hero">
        <div className="tf-container not-found-grid">
          <div>
            <span className="not-found-kicker">Error 404</span>
            <h1>Esta página no está disponible</h1>
            <p>
              Puede que el enlace haya cambiado, la propiedad ya no esté
              publicada o la dirección tenga un error. Te ayudamos a volver al
              camino útil.
            </p>
            <div className="not-found-actions">
              <Link className="tf-btn btn-bg-1 btn-px-28" href="/propiedades">
                <span>Ver propiedades</span>
                <span className="bg-effect"></span>
              </Link>
              <Link className="not-found-link" href="/contacto">
                Contactar a Legalio
              </Link>
            </div>
          </div>

          <aside className="not-found-card" aria-label="Rutas recomendadas">
            <h2>También puedes ir a</h2>
            <nav>
              <Link href="/arriendos-palmira">
                Casas y apartamentos en arriendo
              </Link>
              <Link href="/propiedades-en-venta-palmira">
                Propiedades en venta
              </Link>
              <Link href="/propietarios">Administración de inmuebles</Link>
              <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
            </nav>
          </aside>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .not-found-page {
              background: #ffffff;
              color: #111827;
              min-height: 100%;
            }

            .not-found-hero {
              align-items: center;
              background: linear-gradient(135deg, #f8fafc 0%, #ffffff 58%, #fff5d8 100%);
              display: flex;
              min-height: calc(100vh - 170px);
              padding: 170px 0 90px;
            }

            .not-found-grid {
              align-items: center;
              display: grid;
              gap: 56px;
              grid-template-columns: minmax(0, 1.15fr) minmax(310px, 0.85fr);
            }

            .not-found-kicker {
              color: #5c4300;
              display: inline-flex;
              font-size: 14px;
              font-weight: 900;
              letter-spacing: 0.08em;
              margin-bottom: 18px;
              text-transform: uppercase;
            }

            .not-found-page h1,
            .not-found-page h2 {
              color: #031756;
              letter-spacing: 0;
              margin: 0;
            }

            .not-found-page h1 {
              font-size: clamp(42px, 5vw, 68px);
              font-weight: 900;
              line-height: 1.05;
              max-width: 760px;
            }

            .not-found-page p {
              color: #4b5563;
              font-size: 20px;
              line-height: 1.7;
              margin: 24px 0 0;
              max-width: 700px;
            }

            .not-found-actions {
              align-items: center;
              display: flex;
              flex-wrap: wrap;
              gap: 18px;
              margin-top: 34px;
            }

            .not-found-link {
              color: #031756;
              font-size: 17px;
              font-weight: 900;
              text-decoration: underline;
              text-underline-offset: 5px;
            }

            .not-found-card {
              background: rgba(255, 255, 255, 0.9);
              border: 1px solid rgba(3, 23, 86, 0.1);
              border-radius: 12px;
              box-shadow: 0 18px 48px rgba(3, 23, 86, 0.1);
              padding: 30px;
            }

            .not-found-card h2 {
              font-size: 26px;
              font-weight: 900;
              line-height: 1.2;
              margin-bottom: 20px;
            }

            .not-found-card nav {
              display: grid;
              gap: 12px;
            }

            .not-found-card a {
              align-items: center;
              border: 1px solid #d9dce6;
              border-radius: 8px;
              color: #031756;
              display: flex;
              font-weight: 800;
              justify-content: space-between;
              min-height: 52px;
              padding: 13px 16px;
              text-decoration: none;
            }

            .not-found-card a::after {
              content: ">";
              color: #f7be2e;
              font-weight: 900;
            }

            @media (max-width: 900px) {
              .not-found-grid {
                grid-template-columns: 1fr;
              }

              .not-found-hero {
                padding-top: 140px;
              }
            }

            @media (max-width: 640px) {
              .not-found-page h1 {
                font-size: 40px;
              }

              .not-found-page p {
                font-size: 18px;
              }

              .not-found-actions .tf-btn,
              .not-found-link {
                justify-content: center;
                width: 100%;
              }
            }
          `,
        }}
      />
    </main>
  );
}
