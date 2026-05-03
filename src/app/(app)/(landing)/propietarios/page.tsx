import type { Metadata } from "next";
import { sendOwnerLead } from "./actions";
import Image from "next/image";
import Link from "next/link";
// import { Manrope, Noto_Serif } from "next/font/google";

// const manrope = Manrope({
//     subsets: ["latin"],
//     weight: ["400", "500", "600", "700"],
//     variable: "--legalio-sans",
// });

// const notoSerif = Noto_Serif({
//     subsets: ["latin"],
//     weight: ["700", "900"],
//     variable: "--legalio-serif",
// });

export const metadata: Metadata = {
    title: "Legalio | Administración de inmuebles para propietarios",
    description:
        "Administración comercial, operativa y legal para propietarios que quieren arrendar con respaldo jurídico y tranquilidad.",
};

const painPoints = [
    {
        icon: "icon-ChartDonut",
        title: "Inquilinos que no pagan",
        text: "Protegemos tu flujo de caja con filtros rigurosos y pólizas de garantía.",
    },
    {
        icon: "icon-FileDoc",
        title: "Contratos mal redactados",
        text: "Documentos actualizados a la ley de arrendamientos vigente (Ley 820 de 2003).",
    },
    {
        icon: "icon-HouseLine",
        title: "Daños al inmueble",
        text: "Inventarios detallados con registro fotográfico y seguimiento periódico.",
    },
    {
        icon: "icon-ClockCountdown",
        title: "Procesos largos",
        text: "Agilizamos trámites notariales y procesos de restitución si es necesario.",
    },
];

const solutionItems = [
    {
        title: "Gestión comercial",
        text: "Fotografía profesional, publicación en portales líderes y tours presenciales con ejecutivos especializados.",
    },
    {
        title: "Filtro y documentación",
        text: "Estudio minucioso de capacidad financiera y antecedentes. Solo arrendatarios de alta confiabilidad.",
    },
    {
        title: "Contratos y respaldo legal",
        text: "Elaboración y firma digital o notarial. Soporte jurídico permanente ante cualquier eventualidad.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Registro",
        text: "Ingresas los datos básicos de tu propiedad en nuestra plataforma.",
    },
    {
        number: "02",
        title: "Evaluación",
        text: "Realizamos un peritaje técnico y análisis de mercado para el canon ideal.",
    },
    {
        number: "03",
        title: "Búsqueda",
        text: "Filtramos prospectos hasta encontrar al inquilino con el perfil perfecto.",
    },
    {
        number: "04",
        title: "Administración",
        text: "Tú solo recibes el dinero, nosotros nos encargamos del resto.",
    },
];

const benefits = [
    {
        title: "Seguridad Jurídica Total",
        text: "Respaldo legal ilimitado en procesos de restitución y cobro jurídico.",
    },
    {
        title: "Cero Trámites Operativos",
        text: "Gestionamos mantenimientos, pagos de administración e impuestos.",
    },
    {
        title: "Filtro de IA y Expertos",
        text: "Tecnología avanzada para predecir el comportamiento del arrendatario.",
    },
];

const serviceBadges = ["Mantenimiento", "Cobros"];

const solutionImage = "/assets/images/propietarios/solutionImage.png";

const benefitsImage = "/assets/images/propietarios/benefitsImage.png";

type PropietariosPageProps = {
    searchParams?: Promise<{
        sent?: string;
    }>;
};

export default async function PropietariosPage({
    searchParams,
}: PropietariosPageProps) {
    const params = await searchParams;
    const wasSent = params?.sent === "true";

    return (
        <>
            <main className="legalio-propietarios">
                <section className="lp-hero" id="inicio">
                    <div className="lp-container lp-hero-grid">
                        <div className="lp-hero-copy">
                            <span className="lp-pill">
                                Administración Integral
                            </span>
                            <h1>
                                Arrienda tu propiedad con{" "}
                                <span>respaldo legal</span> y sin dolores de
                                cabeza
                            </h1>
                            <p>
                                Gestión comercial, operativa y legal experta.
                                Convertimos la complejidad de los
                                arrendamientos en rentabilidad pasiva y segura.
                            </p>
                            <Link
                                className="lp-primary-button"
                                data-analytics-event="cta_click"
                                data-analytics-location="propietarios_hero"
                                data-analytics-name="Quiero que administren mi propiedad"
                                href="#contacto"
                            >
                                Quiero que administren mi propiedad
                                <span className="icon-CaretRight" />
                            </Link>
                        </div>

                        <div className="lp-dashboard-wrap" aria-hidden="true">
                            <div className="lp-dashboard">
                                <div className="lp-dashboard-header">
                                    <div>
                                        <h3>Estado de Propiedad</h3>
                                        <p>Calle 100 #15-32, Bogotá</p>
                                    </div>
                                    <span className="lp-dashboard-shield icon-Certificate" />
                                </div>

                                <div className="lp-status-list">
                                    <div className="lp-status-card">
                                        <div className="lp-status-meta">
                                            <span className="lp-status-icon icon-FingerprintSimple" />
                                            <div>
                                                <strong>
                                                    Verificación de Inquilino
                                                </strong>
                                                <small>
                                                    Centrales de riesgo: OK
                                                </small>
                                            </div>
                                        </div>
                                        <span className="lp-status-badge lp-status-badge-green">
                                            Aprobado
                                        </span>
                                    </div>
                                    <div className="lp-status-card">
                                        <div className="lp-status-meta">
                                            <span className="lp-status-icon lp-status-icon-gold icon-FileDoc" />
                                            <div>
                                                <strong>Contrato Legal</strong>
                                                <small>
                                                    Última revisión: Hoy
                                                </small>
                                            </div>
                                        </div>
                                        <span className="lp-status-badge lp-status-badge-blue">
                                            Activo
                                        </span>
                                    </div>
                                </div>

                                <div className="lp-dashboard-stats">
                                    <div>
                                        <strong>$4.5M</strong>
                                        <span>Canon Recibido</span>
                                    </div>
                                    <div>
                                        <strong>100%</strong>
                                        <span>Seguridad</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="lp-section lp-section-white">
                    <div className="lp-container">
                        <div className="lp-section-heading lp-centered">
                            <span className="lp-kicker">Evita Riesgos</span>
                            <h2>
                                Arrendar no debería convertirse en un problema
                                legal
                            </h2>
                        </div>
                        <div className="lp-risk-grid">
                            {painPoints.map((item) => (
                                <article className="lp-risk-card" key={item.title}>
                                    <span className={`lp-risk-icon ${item.icon}`} />
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="lp-section lp-solution">
                    <Image
                        alt="Apartamento de lujo administrado por Legalio"
                        className="lp-solution-image"
                        fill
                        sizes="100vw"
                        src={solutionImage}
                    />
                    <div className="lp-container lp-solution-content">
                        <div className="lp-solution-top">
                            <div>
                                <span className="lp-kicker lp-kicker-gold">
                                    Nuestra Solución
                                </span>
                                <h2>
                                    Nos encargamos de la administración completa
                                    de tu inmueble
                                </h2>
                            </div>
                            {/* <Link href="#servicios">
                                Ver todos los servicios
                                <span className="icon-CaretRight" />
                            </Link> */}
                        </div>
                        <div className="lp-solution-grid">
                            {solutionItems.map((item) => (
                                <article key={item.title}>
                                    <span />
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="lp-section lp-process" id="proceso">
                    <div className="lp-container">
                        <div className="lp-section-heading lp-centered">
                            <h2>Así funciona</h2>
                            <p>
                                Un proceso transparente diseñado para tu
                                comodidad y seguridad.
                            </p>
                        </div>
                        <div className="lp-process-grid">
                            {processSteps.map((step) => (
                                <article
                                    className="lp-process-step"
                                    key={step.number}
                                >
                                    <span>{step.number}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="lp-section lp-benefits">
                    <div className="lp-container lp-benefits-grid">
                        <div className="lp-benefits-media">
                            <Image
                                alt="Inmueble moderno administrado por Legalio"
                                className="lp-benefits-image"
                                fill
                                sizes="(max-width: 1100px) calc(100vw - 32px), 610px"
                                src={benefitsImage}
                            />
                            <div className="lp-media-stat">
                                <strong>+98%</strong>
                                <span>Fidelidad de Pago</span>
                            </div>
                        </div>
                        <div className="lp-benefits-copy">
                            <h2>Por qué los propietarios eligen Legalio</h2>
                            <ul>
                                {benefits.map((benefit) => (
                                    <li key={benefit.title}>
                                        <span className="icon-CheckCircle" />
                                        <div>
                                            <h3>{benefit.title}</h3>
                                            <p>{benefit.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="lp-section lp-section-white" id="servicios">
                    <div className="lp-container">
                        <div className="lp-section-heading lp-centered">
                            <h2>Nuestros Servicios</h2>
                        </div>
                        <div className="lp-services-grid">
                            <article className="lp-service-card lp-service-main">
                                <div>
                                    <span className="lp-service-icon icon-HouseSimple" />
                                    <h3>Administración Delegada</h3>
                                    <p>
                                        La solución llave en mano donde nos
                                        haces responsables de absolutamente todo
                                        lo relacionado con tu propiedad.
                                    </p>
                                </div>
                                <div className="lp-service-tags">
                                    {serviceBadges.map((badge) => (
                                        <span key={badge}>{badge}</span>
                                    ))}
                                </div>
                            </article>

                            <article className="lp-service-card">
                                <span className="lp-service-icon icon-CheckCircle" />
                                <h3>Estudio de Arrendatario</h3>
                                <p>
                                    Análisis profundo de solvencia, estabilidad
                                    laboral y referencias con tecnología de Big
                                    Data.
                                </p>
                            </article>

                            <article className="lp-service-card">
                                <span className="lp-service-icon icon-FileDoc" />
                                <h3>Inventarios Digitales</h3>
                                <p>
                                    Registro HD de cada rincón para evitar
                                    disputas al finalizar el contrato.
                                </p>
                            </article>

                            <article className="lp-service-card lp-service-legal">
                                <div>
                                    <span className="lp-service-icon icon-Certificate" />
                                    <h3>Asesoría Jurídica Vitalicia</h3>
                                    <p>
                                        Mientras tu inmueble esté con nosotros,
                                        nuestro bufete de abogados es tu bufete
                                        personal para cualquier tema
                                        inmobiliario.
                                    </p>
                                </div>
                                <div className="lp-shield-box">
                                    <span className="icon-Lifebuoy" />
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="lp-quote-section">
                    <div className="lp-container lp-quote-wrap">
                        <span className="lp-quote-mark icon-quote-line" />
                        <blockquote>
                            No somos solo una inmobiliaria que publica avisos;
                            somos abogados que administran activos. Nuestra
                            visión legal previene el problema antes de que
                            ocurra.
                        </blockquote>
                        <p>
                            Equipo Legalio - Expertos en Derecho Inmobiliario
                        </p>
                    </div>
                </section>

                <section className="lp-section lp-section-white" id="contacto">
                    <div className="lp-container lp-contact-grid">
                        <div className="lp-contact-copy">
                            <h2>
                                Déjanos evaluar tu propiedad sin compromiso
                            </h2>
                            <p>
                                Uno de nuestros directores jurídicos se pondrá
                                en contacto contigo en menos de 24 horas para
                                una valoración inicial gratuita.
                            </p>
                            <div className="lp-contact-items">
                                <Link href="tel:+573046035418">
                                    <span className="icon-PhoneCall" />
                                    +57 304 6035418
                                </Link>
                                <Link href="mailto:contacto@legalio.com.co">
                                    <span className="icon-EnvelopeSimple" />
                                    contacto@legalio.com.co
                                </Link>
                            </div>
                        </div>

                        <form
                            action={sendOwnerLead}
                            className="lp-form"
                            data-analytics-form="owner_lead"
                        >
                            {wasSent ? (
                                <div className="lp-form-alert" role="status">
                                    Recibimos tu solicitud. Nuestro equipo te
                                    contactará pronto.
                                </div>
                            ) : null}
                            <div className="lp-form-row">
                                <label>
                                    <span>Nombre Completo</span>
                                    <input
                                        autoComplete="name"
                                        name="nombre"
                                        placeholder="Ej: Maria Perez"
                                        required
                                        type="text"
                                    />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input
                                        autoComplete="email"
                                        name="email"
                                        placeholder="correo@ejemplo.com"
                                        required
                                        type="email"
                                    />
                                </label>
                            </div>
                            <div className="lp-form-row">
                                <label>
                                    <span>WhatsApp</span>
                                    <input
                                        autoComplete="tel"
                                        name="whatsapp"
                                        placeholder="+57 300 000 0000"
                                        required
                                        type="tel"
                                    />
                                </label>
                                <label>
                                    <span>Ciudad</span>
                                    <input
                                        autoComplete="address-level2"
                                        name="ciudad"
                                        placeholder="Bogotá, Medellín..."
                                        required
                                        type="text"
                                    />
                                </label>
                                <label>
                                    <span>Barrio</span>
                                    <input
                                        name="barrio"
                                        placeholder="Ej: Cedritos"
                                        type="text"
                                    />
                                </label>
                            </div>
                            <label>
                                <span>Tipo de Propiedad</span>
                                <select
                                    name="tipoPropiedad"
                                    defaultValue="Apartamento"
                                    required
                                >
                                    <option>Apartamento</option>
                                    <option>Casa</option>
                                    <option>Local Comercial</option>
                                    <option>Oficina</option>
                                </select>
                            </label>
                            <label>
                                <span>Mensaje</span>
                                <textarea
                                    name="mensaje"
                                    placeholder="Cuéntanos sobre tu inmueble..."
                                    rows={4}
                                />
                            </label>
                            <button type="submit">Solicitar evaluación</button>
                        </form>
                    </div>
                </section>

                <section className="lp-final-cta">
                    <div className="lp-container">
                        <h2>
                            Convierte tu inmueble en un activo bien administrado
                        </h2>
                        <Link
                            data-analytics-event="cta_click"
                            data-analytics-location="propietarios_final"
                            data-analytics-name="Empezar ahora"
                            href="#contacto"
                        >
                            Empezar ahora
                            <span className="icon-CaretRight" />
                        </Link>
                    </div>
                </section>
            </main>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    .legalio-propietarios {
                        --lp-on-tertiary: #ffffff;
                        --lp-on-secondary-container: #5c617c;
                        --lp-surface-bright: #fbf8fe;
                        --lp-surface-container-high: #e9e7ed;
                        --lp-surface: #fbf8fe;
                        --lp-surface-container-low: #f5f2f9;
                        --lp-surface-container-highest: #e4e1e8;
                        --lp-error: #ba1a1a;
                        --lp-tertiary-fixed-dim: #f7be2e;
                        --lp-background: #fbf8fe;
                        --lp-on-surface-variant: #454650;
                        --lp-surface-variant: #e4e1e8;
                        --lp-primary-fixed: #dde1ff;
                        --lp-surface-container: #efedf3;
                        --lp-tertiary-fixed: #ffdf9f;
                        --lp-on-primary: #ffffff;
                        --lp-on-surface: #1b1b20;
                        --lp-primary-container: #031756;
                        --lp-primary: #00031b;
                        --lp-on-primary-container: #7382c5;
                        --lp-on-primary-fixed-variant: #334380;
                        --lp-outline: #767681;
                        --lp-on-tertiary-container: #aa7f00;
                        --lp-outline-variant: #c6c5d1;
                        --lp-on-tertiary-fixed-variant: #5c4300;
                        // --lp-font-body: var(--legalio-sans), Manrope, Arial, sans-serif;
                        --lp-font-display: var(--legalio-serif), Georgia, serif;
                        background: var(--lp-surface);
                        color: var(--lp-on-surface);
                        // font-family: var(--lp-font-body);
                        font-size: 18px;
                        line-height: 1.5;
                        min-height: 100vh;
                        overflow-x: clip;
                        scroll-behavior: smooth;
                    }

                    .legalio-propietarios *,
                    .legalio-propietarios *::before,
                    .legalio-propietarios *::after {
                        box-sizing: border-box;
                    }

                    .legalio-propietarios a {
                        color: inherit;
                        text-decoration: none;
                    }

                    .legalio-propietarios img {
                        display: block;
                        max-width: 100%;
                    }

                    .lp-container {
                        width: min(100% - 48px, 1280px);
                        margin: 0 auto;
                    }

                    .lp-hero {
                        background: radial-gradient(circle at 86% 24%, rgba(255, 223, 159, 0.5), transparent 28%),
                            linear-gradient(135deg, var(--lp-surface-container-low), #ffffff 70%);
                        min-height: 795px;
                        overflow: hidden;
                        padding: 168px 0 96px;
                        position: relative;
                    }

                    .lp-hero-grid {
                        align-items: center;
                        display: grid;
                        gap: 64px;
                        grid-template-columns: minmax(0, 1fr) minmax(380px, 0.92fr);
                    }

                    .lp-hero-copy {
                        position: relative;
                        z-index: 1;
                    }

                    .lp-pill {
                        background: var(--lp-tertiary-fixed);
                        border-radius: 999px;
                        color: var(--lp-on-tertiary-fixed-variant);
                        display: inline-flex;
                        font-size: 15px;
                        font-weight: 800;
                        letter-spacing: 0.08em;
                        line-height: 1.3;
                        margin-bottom: 24px;
                        padding: 7px 16px;
                        text-transform: uppercase;
                    }

                    .lp-hero h1,
                    .lp-section-heading h2,
                    .lp-solution h2,
                    .lp-benefits-copy h2,
                    .lp-contact-copy h2,
                    .lp-final-cta h2 {
                        color: var(--lp-primary);
                        font-family: var(--lp-font-display);
                        font-weight: 900;
                        letter-spacing: 0;
                        margin: 0;
                    }

                    .lp-hero h1 {
                        font-size: clamp(48px, 6.4vw, 88px);
                        line-height: 1.08;
                        max-width: 760px;
                    }

                    .lp-hero h1 span {
                        color: var(--lp-on-primary-fixed-variant);
                    }

                    .lp-hero-copy p {
                        color: var(--lp-on-surface-variant);
                        font-size: 20px;
                        line-height: 1.7;
                        margin: 30px 0 40px;
                        max-width: 560px;
                    }

                    .lp-primary-button,
                    .lp-final-cta a {
                        align-items: center;
                        background: var(--lp-primary-container);
                        border-radius: 10px;
                        color: var(--lp-on-primary);
                        display: inline-flex;
                        font-size: 18px;
                        font-weight: 800;
                        gap: 12px;
                        justify-content: center;
                        line-height: 1.2;
                        min-height: 64px;
                        padding: 18px 28px;
                        transition: opacity 180ms ease, transform 180ms ease;
                    }

                    .lp-primary-button,
                    .lp-primary-button:hover {
                        color: #ffffff !important;
                    }

                    .lp-primary-button:hover,
                    .lp-final-cta a:hover {
                        color: var(--lp-on-primary);
                        transform: translateY(-2px);
                    }

                    .lp-dashboard-wrap {
                        position: relative;
                    }

                    .lp-dashboard-wrap::before,
                    .lp-dashboard-wrap::after {
                        border-radius: 999px;
                        content: "";
                        filter: blur(52px);
                        position: absolute;
                        z-index: 0;
                    }

                    .lp-dashboard-wrap::before {
                        background: rgba(255, 223, 159, 0.55);
                        height: 250px;
                        right: -54px;
                        top: -48px;
                        width: 250px;
                    }

                    .lp-dashboard-wrap::after {
                        background: rgba(221, 225, 255, 0.8);
                        bottom: -74px;
                        height: 320px;
                        left: -74px;
                        width: 320px;
                    }

                    .lp-dashboard {
                        background: rgba(255, 255, 255, 0.78);
                        border: 1px solid rgba(198, 197, 209, 0.4);
                        border-radius: 16px;
                        box-shadow: 0 18px 55px rgba(0, 3, 27, 0.1);
                        padding: 28px;
                        position: relative;
                        z-index: 1;
                        backdrop-filter: blur(18px);
                    }

                    .lp-dashboard-header {
                        align-items: center;
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 32px;
                    }

                    .lp-dashboard h3 {
                        color: var(--lp-primary);
                        font-family: var(--lp-font-display);
                        font-size: 20px;
                        font-weight: 900;
                        margin: 0 0 6px;
                    }

                    .lp-dashboard p {
                        color: var(--lp-on-surface-variant);
                        font-size: 16px;
                        margin: 0;
                    }

                    .lp-dashboard-shield {
                        color: var(--lp-on-tertiary-container);
                        font-size: 43px;
                    }

                    .lp-status-list {
                        display: grid;
                        gap: 16px;
                    }

                    .lp-status-card {
                        align-items: center;
                        background: var(--lp-surface);
                        border-radius: 10px;
                        display: flex;
                        gap: 16px;
                        justify-content: space-between;
                        min-height: 86px;
                        padding: 16px;
                    }

                    .lp-status-meta {
                        align-items: center;
                        display: flex;
                        gap: 12px;
                        min-width: 0;
                    }

                    .lp-status-icon {
                        align-items: center;
                        background: var(--lp-primary-fixed);
                        border-radius: 999px;
                        color: var(--lp-primary-container);
                        display: inline-flex;
                        flex: 0 0 auto;
                        font-size: 22px;
                        height: 42px;
                        justify-content: center;
                        width: 42px;
                    }

                    .lp-status-icon-gold {
                        background: var(--lp-tertiary-fixed);
                        color: var(--lp-on-tertiary-fixed-variant);
                    }

                    .lp-status-meta strong {
                        color: var(--lp-on-surface);
                        display: block;
                        font-size: 16px;
                        font-weight: 800;
                        line-height: 1.35;
                    }

                    .lp-status-meta small {
                        color: var(--lp-on-surface-variant);
                        display: block;
                        font-size: 14px;
                        line-height: 1.45;
                        margin-top: 4px;
                    }

                    .lp-status-badge {
                        border-radius: 999px;
                        flex: 0 0 auto;
                        font-size: 14px;
                        font-weight: 900;
                        letter-spacing: 0.05em;
                        padding: 6px 12px;
                        text-transform: uppercase;
                    }

                    .lp-status-badge-green {
                        background: #dcfce7;
                        color: #15803d;
                    }

                    .lp-status-badge-blue {
                        background: var(--lp-primary-container);
                        color: var(--lp-on-primary);
                    }

                    .lp-dashboard-stats {
                        border-top: 1px solid rgba(198, 197, 209, 0.5);
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        margin-top: 32px;
                        padding-top: 24px;
                        text-align: center;
                    }

                    .lp-dashboard-stats div + div {
                        border-left: 1px solid rgba(198, 197, 209, 0.5);
                    }

                    .lp-dashboard-stats strong {
                        color: var(--lp-primary-container);
                        display: block;
                        font-family: var(--lp-font-display);
                        font-size: 28px;
                        font-weight: 900;
                        line-height: 1;
                    }

                    .lp-dashboard-stats span {
                        color: var(--lp-on-surface-variant);
                        display: block;
                        font-size: 14px;
                        font-weight: 900;
                        letter-spacing: 0.08em;
                        line-height: 1.35;
                        margin-top: 10px;
                        text-transform: uppercase;
                    }

                    .lp-section {
                        padding: 128px 0;
                    }

                    .lp-section-white {
                        background: #ffffff;
                    }

                    .lp-section-heading {
                        margin-bottom: 72px;
                    }

                    .lp-centered {
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 780px;
                        text-align: center;
                    }

                    .lp-kicker {
                        color: var(--lp-on-tertiary-fixed-variant);
                        display: block;
                        font-size: 14px;
                        font-weight: 900;
                        letter-spacing: 0.1em;
                        line-height: 1.35;
                        margin-bottom: 16px;
                        text-transform: uppercase;
                    }

                    .lp-kicker-gold {
                        color: var(--lp-tertiary-fixed);
                    }

                    .lp-section-heading h2,
                    .lp-solution h2,
                    .lp-contact-copy h2 {
                        font-size: clamp(36px, 4vw, 58px);
                        line-height: 1.13;
                    }

                    .lp-section-heading p {
                        color: var(--lp-on-surface-variant);
                        font-size: 18px;
                        line-height: 1.7;
                        margin: 16px auto 0;
                        max-width: 560px;
                    }

                    .lp-risk-grid {
                        display: grid;
                        gap: 28px;
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                    }

                    .lp-risk-card {
                        background: var(--lp-surface-container-low);
                        border: 1px solid rgba(198, 197, 209, 0.3);
                        border-radius: 12px;
                        min-height: 268px;
                        padding: 32px;
                        transition: background 180ms ease, transform 180ms ease;
                    }

                    .lp-risk-card:hover {
                        background: var(--lp-surface-container-high);
                        transform: translateY(-3px);
                    }

                    .lp-risk-icon {
                        color: var(--lp-error);
                        display: inline-block;
                        font-size: 40px;
                        margin-bottom: 26px;
                    }

                    .lp-risk-card h3,
                    .lp-solution-grid h3,
                    .lp-process-step h3,
                    .lp-service-card h3,
                    .lp-benefits-copy h3 {
                        color: var(--lp-primary);
                        font-family: var(--lp-font-display);
                        font-weight: 900;
                        letter-spacing: 0;
                        margin: 0;
                    }

                    .lp-risk-card h3 {
                        font-size: 23px;
                        line-height: 1.25;
                        margin-bottom: 16px;
                    }

                    .lp-risk-card p,
                    .lp-service-card p,
                    .lp-process-step p,
                    .lp-benefits-copy p {
                        color: var(--lp-on-surface-variant);
                        font-size: 18px;
                        line-height: 1.7;
                        margin: 0;
                    }

                    .lp-solution {
                        background: var(--lp-primary);
                        color: var(--lp-on-primary);
                        overflow: hidden;
                        position: relative;
                    }

                    .lp-solution-image {
                        height: 100%;
                        inset: 0;
                        object-fit: cover;
                        opacity: 0.1;
                        position: absolute;
                        width: 100%;
                    }

                    .lp-solution-content {
                        position: relative;
                        z-index: 1;
                    }

                    .lp-solution-top {
                        align-items: flex-end;
                        display: flex;
                        gap: 40px;
                        justify-content: space-between;
                        margin-bottom: 76px;
                    }

                    .lp-solution-top div {
                        max-width: 720px;
                    }

                    .lp-solution h2,
                    .lp-solution-grid h3 {
                        color: var(--lp-on-primary);
                    }

                    .lp-solution-top a {
                        align-items: center;
                        color: var(--lp-tertiary-fixed);
                        display: inline-flex;
                        flex: 0 0 auto;
                        font-weight: 800;
                        gap: 8px;
                    }

                    .lp-solution-top a:hover {
                        text-decoration: underline;
                        text-underline-offset: 8px;
                    }

                    .lp-solution-grid {
                        display: grid;
                        gap: 48px;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }

                    .lp-solution-grid article > span {
                        background: var(--lp-tertiary-fixed);
                        display: block;
                        height: 4px;
                        margin-bottom: 34px;
                        width: 64px;
                    }

                    .lp-solution-grid h3 {
                        font-size: 25px;
                        margin-bottom: 22px;
                    }

                    .lp-solution-grid p {
                        color: rgba(255, 255, 255, 0.78);
                        font-size: 18px;
                        line-height: 1.8;
                        margin: 0;
                    }

                    .lp-process {
                        background: var(--lp-surface);
                    }

                    .lp-process-grid {
                        display: grid;
                        gap: 32px;
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                    }

                    .lp-process-step {
                        min-height: 190px;
                        padding-top: 42px;
                        position: relative;
                    }

                    .lp-process-step > span {
                        color: rgba(3, 23, 86, 0.06);
                        font-size: 84px;
                        font-weight: 900;
                        left: 0;
                        line-height: 1;
                        position: absolute;
                        top: -2px;
                    }

                    .lp-process-step h3 {
                        font-size: 22px;
                        margin-bottom: 16px;
                        position: relative;
                    }

                    .lp-process-step p {
                        position: relative;
                    }

                    .lp-benefits {
                        background: var(--lp-surface-container-low);
                        overflow: hidden;
                    }

                    .lp-benefits-grid {
                        align-items: center;
                        display: grid;
                        gap: 80px;
                        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
                    }

                    .lp-benefits-media {
                        aspect-ratio: 1;
                        border-radius: 16px;
                        overflow: hidden;
                        position: relative;
                    }

                    .lp-benefits-media img {
                        height: 100%;
                        object-fit: cover;
                        width: 100%;
                    }

                    .lp-media-stat {
                        background: rgba(255, 255, 255, 0.78);
                        border: 1px solid rgba(198, 197, 209, 0.42);
                        border-radius: 12px;
                        bottom: 32px;
                        box-shadow: 0 18px 40px rgba(0, 3, 27, 0.12);
                        padding: 26px 30px;
                        position: absolute;
                        right: 32px;
                        backdrop-filter: blur(16px);
                    }

                    .lp-media-stat strong {
                        color: var(--lp-primary-container);
                        display: block;
                        font-family: var(--lp-font-display);
                        font-size: 40px;
                        font-weight: 900;
                        line-height: 1;
                        margin-bottom: 10px;
                    }

                    .lp-media-stat span {
                        color: var(--lp-on-surface-variant);
                        display: block;
                        font-size: 14px;
                        font-weight: 900;
                        letter-spacing: 0.08em;
                        line-height: 1.35;
                        text-transform: uppercase;
                    }

                    .lp-benefits-copy h2 {
                        font-size: clamp(34px, 3.2vw, 50px);
                        line-height: 1.15;
                        margin-bottom: 40px;
                    }

                    .lp-benefits-copy ul {
                        display: grid;
                        gap: 26px;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }

                    .lp-benefits-copy li {
                        align-items: flex-start;
                        display: flex;
                        gap: 16px;
                    }

                    .lp-benefits-copy li > span {
                        color: var(--lp-on-tertiary-container);
                        flex: 0 0 auto;
                        font-size: 24px;
                        margin-top: 4px;
                    }

                    .lp-benefits-copy h3 {
                        font-family: var(--lp-font-body);
                        font-size: 19px;
                        margin-bottom: 8px;
                    }

                    .lp-services-grid {
                        display: grid;
                        gap: 24px;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }

                    .lp-service-card {
                        background: var(--lp-surface-container-high);
                        border: 1px solid rgba(198, 197, 209, 0.28);
                        border-radius: 16px;
                        min-height: 260px;
                        padding: 38px;
                    }

                    .lp-service-main {
                        background: var(--lp-primary-container);
                        color: var(--lp-on-primary);
                        display: flex;
                        flex-direction: column;
                        grid-column: span 2;
                        justify-content: space-between;
                    }

                    .lp-service-main h3,
                    .lp-service-main p {
                        color: var(--lp-on-primary);
                    }

                    .lp-service-main p {
                        color: rgba(255, 255, 255, 0.78);
                        max-width: 520px;
                    }

                    .lp-service-icon {
                        color: var(--lp-primary-container);
                        display: inline-block;
                        font-size: 38px;
                        margin-bottom: 24px;
                    }

                    .lp-service-main .lp-service-icon {
                        color: var(--lp-tertiary-fixed);
                    }

                    .lp-service-card h3 {
                        font-size: 24px;
                        line-height: 1.25;
                        margin-bottom: 16px;
                    }

                    .lp-service-main h3,
                    .lp-service-legal h3 {
                        font-size: 29px;
                    }

                    .lp-service-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 12px;
                        margin-top: 44px;
                    }

                    .lp-service-tags span {
                        background: rgba(255, 255, 255, 0.12);
                        border-radius: 999px;
                        color: var(--lp-on-primary);
                        font-size: 15px;
                        font-weight: 700;
                        line-height: 1.35;
                        padding: 9px 15px;
                    }

                    .lp-service-legal {
                        align-items: center;
                        background: var(--lp-tertiary-fixed);
                        color: #261a00;
                        display: flex;
                        gap: 32px;
                        grid-column: span 2;
                    }

                    .lp-service-legal .lp-service-icon,
                    .lp-service-legal h3 {
                        color: #261a00;
                    }

                    .lp-service-legal p {
                        color: var(--lp-on-tertiary-fixed-variant);
                    }

                    .lp-shield-box {
                        align-items: center;
                        background: rgba(0, 3, 27, 0.05);
                        border-radius: 12px;
                        display: flex;
                        flex: 0 0 190px;
                        height: 190px;
                        justify-content: center;
                    }

                    .lp-shield-box span {
                        color: rgba(0, 3, 27, 0.22);
                        font-size: 80px;
                    }

                    .lp-quote-section {
                        background: var(--lp-surface-container-low);
                        padding: 96px 0;
                    }

                    .lp-quote-wrap {
                        max-width: 900px;
                        text-align: center;
                    }

                    .lp-quote-mark {
                        color: var(--lp-primary-container);
                        display: inline-block;
                        font-size: 50px;
                        margin-bottom: 30px;
                    }

                    .lp-quote-wrap blockquote {
                        color: var(--lp-primary);
                        font-family: var(--lp-font-display);
                        font-size: clamp(30px, 3.6vw, 48px);
                        font-style: italic;
                        font-weight: 700;
                        line-height: 1.22;
                        margin: 0 0 30px;
                    }

                    .lp-quote-wrap p {
                        color: var(--lp-on-tertiary-fixed-variant);
                        font-size: 14px;
                        font-weight: 900;
                        letter-spacing: 0.08em;
                        line-height: 1.45;
                        margin: 0;
                        text-transform: uppercase;
                    }

                    .lp-contact-grid {
                        display: grid;
                        gap: 80px;
                        grid-template-columns: minmax(0, 1fr) minmax(420px, 0.9fr);
                    }

                    .lp-contact-copy p {
                        color: var(--lp-on-surface-variant);
                        font-size: 18px;
                        line-height: 1.8;
                        margin: 30px 0 40px;
                        max-width: 590px;
                    }

                    .lp-contact-items {
                        display: grid;
                        gap: 20px;
                    }

                    .lp-contact-items a {
                        align-items: center;
                        color: var(--lp-on-surface);
                        display: inline-flex;
                        font-weight: 800;
                        gap: 16px;
                    }

                    .lp-contact-items span {
                        align-items: center;
                        background: var(--lp-primary-fixed);
                        border-radius: 999px;
                        color: var(--lp-primary-container);
                        display: inline-flex;
                        flex: 0 0 auto;
                        font-size: 20px;
                        height: 48px;
                        justify-content: center;
                        width: 48px;
                    }

                    .lp-form {
                        background: var(--lp-surface);
                        border: 1px solid rgba(198, 197, 209, 0.42);
                        border-radius: 16px;
                        box-shadow: 0 18px 55px rgba(0, 3, 27, 0.08);
                        display: grid;
                        gap: 24px;
                        padding: 40px;
                    }

                    .lp-form-alert {
                        background: #dcfce7;
                        border: 1px solid rgba(21, 128, 61, 0.24);
                        border-radius: 10px;
                        color: #14532d;
                        font-size: 16px;
                        font-weight: 800;
                        line-height: 1.5;
                        padding: 14px 16px;
                    }

                    .lp-form-row {
                        display: grid;
                        gap: 24px;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .lp-form label {
                        display: grid;
                        gap: 8px;
                        margin: 0;
                    }

                    .lp-form label > span {
                        color: var(--lp-on-surface-variant);
                        font-size: 14px;
                        font-weight: 900;
                        letter-spacing: 0.08em;
                        line-height: 1.35;
                        text-transform: uppercase;
                    }

                    .lp-form input,
                    .lp-form select,
                    .lp-form textarea {
                        background: #ffffff;
                        border: 0;
                        border-bottom: 2px solid var(--lp-outline-variant);
                        border-radius: 0;
                        color: var(--lp-on-surface);
                        font: inherit;
                        font-size: 16px;
                        line-height: 1.5;
                        min-height: 56px;
                        outline: none;
                        padding: 12px 8px;
                        transition: border-color 180ms ease;
                        width: 100%;
                    }

                    .lp-form textarea {
                        min-height: 116px;
                        resize: vertical;
                    }

                    .lp-form input:focus,
                    .lp-form select:focus,
                    .lp-form textarea:focus {
                        border-bottom-color: var(--lp-on-tertiary-fixed-variant);
                    }

                    .lp-form button {
                        background: var(--lp-primary-container);
                        border: 0;
                        border-radius: 10px;
                        color: var(--lp-on-primary);
                        cursor: pointer;
                        font: inherit;
                        font-size: 18px;
                        font-weight: 900;
                        min-height: 64px;
                        padding: 18px 24px;
                        transition: background 180ms ease, transform 180ms ease;
                    }

                    .lp-form button:hover {
                        background: var(--lp-primary);
                        transform: translateY(-1px);
                    }

                    .lp-final-cta {
                        background: var(--lp-primary);
                        color: var(--lp-on-primary);
                        padding: 96px 0;
                        text-align: center;
                    }

                    .lp-final-cta h2 {
                        color: var(--lp-on-primary);
                        font-size: clamp(36px, 4.6vw, 58px);
                        line-height: 1.15;
                        margin: 0 auto 34px;
                        max-width: 980px;
                    }

                    .lp-final-cta a {
                        background: var(--lp-tertiary-fixed);
                        color: #261a00;
                        font-size: 19px;
                        min-height: 62px;
                    }

                    .lp-final-cta a:hover {
                        color: #261a00;
                    }

                    @media (max-width: 1100px) {
                        .lp-hero-grid,
                        .lp-benefits-grid,
                        .lp-contact-grid {
                            grid-template-columns: 1fr;
                        }

                        .lp-dashboard-wrap {
                            max-width: 620px;
                        }

                        .lp-risk-grid,
                        .lp-process-grid {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }

                        .lp-services-grid {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }

                        .lp-service-card,
                        .lp-service-main,
                        .lp-service-legal {
                            grid-column: auto;
                        }

                        .lp-contact-grid {
                            gap: 52px;
                        }
                    }

                    @media (max-width: 860px) {
                        .lp-container {
                            width: min(100% - 32px, 1280px);
                        }

                        .lp-hero {
                            min-height: 0;
                            padding: 126px 0 72px;
                        }

                        .lp-hero-grid {
                            gap: 44px;
                        }

                        .lp-hero h1 {
                            font-size: clamp(42px, 11vw, 58px);
                        }

                        .lp-hero-copy p {
                            font-size: 17px;
                        }

                        .lp-primary-button {
                            align-items: center;
                            width: 100%;
                        }

                        .lp-section {
                            padding: 82px 0;
                        }

                        .lp-section-heading {
                            margin-bottom: 44px;
                        }

                        .lp-risk-grid,
                        .lp-process-grid,
                        .lp-services-grid,
                        .lp-form-row {
                            grid-template-columns: 1fr;
                        }

                        .lp-solution-top {
                            align-items: flex-start;
                            flex-direction: column;
                            margin-bottom: 48px;
                        }

                        .lp-solution-grid {
                            grid-template-columns: 1fr;
                        }

                        .lp-benefits-grid {
                            gap: 44px;
                        }

                        .lp-service-legal {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .lp-shield-box {
                            flex-basis: auto;
                            height: 150px;
                            width: 100%;
                        }

                        .lp-contact-grid {
                            grid-template-columns: 1fr;
                        }

                        .lp-form {
                            padding: 28px 20px;
                        }

                    }

                    @media (max-width: 560px) {
                        .lp-dashboard {
                            padding: 18px;
                        }

                        .lp-status-card {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .lp-status-badge {
                            align-self: flex-start;
                        }

                        .lp-dashboard-stats strong {
                            font-size: 22px;
                        }

                        .lp-risk-card,
                        .lp-service-card {
                            min-height: auto;
                            padding: 28px 22px;
                        }

                        .lp-media-stat {
                            bottom: 18px;
                            left: 18px;
                            padding: 20px;
                            right: 18px;
                        }

                    }
                `,
                }}
            />
        </>
    );
}
