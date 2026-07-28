import Image from "next/image";
import Link from "next/link";
import styles from "./NotFoundPage.module.css";

type NotFoundPageProps = {
  standalone?: boolean;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 18 16"
      width="18"
    >
      <path
        d="M1 8h15M10 2l6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function NotFoundPage({
  standalone = false,
}: NotFoundPageProps) {
  return (
    <div
      className={`${styles.page} ${standalone ? styles.standalone : ""}`}
    >
      {standalone ? (
        <header className={styles.header}>
          <Link aria-label="Ir al inicio de Legalio" href="/">
            <Image
              alt="Legalio Abogados"
              className={styles.logo}
              height={50}
              priority
              src="/assets/images/logo/logo.png"
              width={214}
            />
          </Link>
          <nav aria-label="Navegación de la página no encontrada" className={styles.nav}>
            <Link href="/">Inicio</Link>
            <Link href="/propiedades">Propiedades</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </header>
      ) : null}

      <main className={styles.main}>
        <section className={styles.layout} aria-labelledby="not-found-title">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span className={styles.errorCode}>404</span>
              Página no encontrada
            </p>
            <h1 className={styles.title} id="not-found-title">
              Esta dirección no tiene llaves.
            </h1>
            <p className={styles.description}>
              La página que buscas cambió de dirección, dejó de estar
              disponible o el enlace tiene un error. Puedes volver al inicio o
              continuar explorando inmuebles con respaldo legal.
            </p>

            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/">
                Volver al inicio
                <ArrowIcon />
              </Link>
              <Link className={styles.secondaryAction} href="/propiedades">
                Explorar propiedades
              </Link>
            </div>

            <p className={styles.help}>
              ¿Necesitas orientación?{" "}
              <Link href="/contacto">Habla con nuestro equipo</Link>
            </p>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <span className={styles.largeCode}>404</span>
            <span className={styles.goldMark} />
            <div className={styles.imageWrap}>
              <Image
                alt=""
                className={styles.image}
                fill
                sizes="(max-width: 820px) 100vw, 42vw"
                src="/assets/images/page-title/page-title-13.webp"
              />
              <span className={styles.imageOverlay} />
            </div>
            <div className={styles.messageCard}>
              <span>La ruta termina aquí</span>
              <strong>Tu búsqueda puede continuar.</strong>
            </div>
          </div>
        </section>
      </main>

      {standalone ? (
        <footer className={styles.footer}>
          <span>Legalio · Soluciones inmobiliarias con respaldo legal</span>
        </footer>
      ) : null}
    </div>
  );
}
