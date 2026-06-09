import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Legalio | Propuesta de servicios jurídicos para Summar",
    description:
        "Propuesta de servicios jurídicos especializados para SUMMAR TEMPORALES S.A.S: tutelas, derechos de petición, impugnaciones, prevención de riesgos y gestión documental.",
    alternates: {
        canonical: "/servicios-juridicos-summar",
    },
};

const whatsappUrl =
    "https://wa.me/573046035418?text=Hola%20Legalio%2C%20quiero%20conocer%20la%20propuesta%20de%20servicios%20jur%C3%ADdicos%20para%20SUMMAR.";

const differentiators = [
    {
        icon: "icon-FileDoc",
        title: "Documentos estratégicos",
        text: "Proyección y revisión de tutelas, derechos de petición, respuestas institucionales e impugnaciones con finalidad jurídica clara.",
    },
    {
        icon: "icon-Certificate",
        title: "Prevención de riesgos",
        text: "Análisis de contingencias por desacato, respuestas incompletas, pérdida de soportes, sanciones y afectaciones reputacionales.",
    },
    {
        icon: "icon-FingerprintSimple",
        title: "Trazabilidad documental",
        text: "Organización de casos, anexos, fechas, entregas y documentos proyectados desde una plataforma para empresas.",
    },
    {
        icon: "icon-ChartDonut",
        title: "Gestión orientada a resultados",
        text: "Meta interna de favorabilidad jurídica entre el 70% y el 80% en casos viables, sin constituir garantía de resultado.",
    },
];

const team = [
    {
        title: "Dirección jurídica",
        text: "Liderada por Paola Andrea Narváez Loaiza, abogada con 7 años de experiencia, formación especializada y maestría en Derecho Digital.",
    },
    {
        title: "Enfoque tecnológico",
        text: "Desarrollo de una plataforma para centralizar solicitudes, soportes, estados, documentos proyectados e historial de actuaciones.",
    },
    {
        title: "UX/UI y procesos",
        text: "Diseño de flujos claros para recepción de solicitudes, formularios internos, seguimiento y conservación de evidencia.",
    },
];

const platformItems = [
    "Cargar documentos y soportes del caso.",
    "Registrar solicitudes de tutelas, peticiones, impugnaciones o revisiones.",
    "Consultar el estado de cada solicitud.",
    "Acceder a documentos proyectados en Word y PDF.",
    "Mantener historial de actuaciones y entregas.",
    "Reducir pérdida, dispersión o duplicidad de información.",
];

const objectives = [
    "Proyectar acciones de tutela, derechos de petición, impugnaciones y documentos conexos.",
    "Disminuir riesgos por respuestas incompletas, tardías o contradictorias.",
    "Fortalecer la posición jurídica de la empresa frente a reclamaciones de terceros.",
    "Prevenir litigios, desacatos, sanciones y responsabilidades posteriores.",
    "Crear documentos claros, verificables y útiles como soporte probatorio.",
    "Recomendar acciones preventivas cuando el caso lo amerite.",
];

const scope = [
    {
        title: "Derechos de petición",
        items: [
            "Revisión del caso y documentos soporte.",
            "Identificación del destinatario y tipo de petición.",
            "Redacción con solicitudes claras, numeradas y útiles.",
            "Fundamentos constitucionales y legales.",
            "Organización de anexos y entrega editable y PDF.",
        ],
    },
    {
        title: "Acciones de tutela",
        items: [
            "Análisis de procedencia, subsidiariedad e inmediatez.",
            "Identificación de derechos fundamentales.",
            "Construcción de hechos, pretensiones y pruebas.",
            "Sustento constitucional y jurisprudencial.",
            "Entrega en Word y PDF, listo para firma y radicación.",
        ],
    },
    {
        title: "Impugnaciones y riesgo",
        items: [
            "Revisión de fallos desfavorables o parcialmente desfavorables.",
            "Argumentación frente a errores fácticos, jurídicos o probatorios.",
            "Riesgos de desacato, términos legales y ausencia de prueba.",
            "Recomendaciones para responder sin comprometer la posición jurídica.",
        ],
    },
];

const process = [
    "Recepción del caso",
    "Diagnóstico jurídico inicial",
    "Identificación de riesgos",
    "Definición de estrategia",
    "Proyección del documento",
    "Control de calidad",
    "Entrega final",
    "Registro y trazabilidad",
];

const deliveryTimes = [
    ["Derecho de petición estándar", "24 a 48 horas hábiles"],
    ["Derecho de petición complejo", "48 a 72 horas hábiles"],
    ["Tutela estándar", "48 horas hábiles"],
    ["Tutela compleja", "72 horas hábiles"],
    ["Tutela urgente", "12 a 24 horas hábiles"],
    ["Impugnación de tutela", "24 a 48 horas hábiles"],
    ["Revisión preventiva de riesgo jurídico", "24 a 72 horas hábiles"],
];

const fees = [
    ["Derecho de petición estándar", "$180.000 COP"],
    ["Derecho de petición complejo", "$220.000 COP"],
    ["Acción de tutela estándar", "$270.000 COP"],
    ["Acción de tutela compleja", "$320.000 COP"],
    ["Acción de tutela urgente", "$420.000 COP"],
    ["Impugnación de tutela", "$70.000 COP"],
    ["Revisión preventiva de riesgo jurídico", "Incluida"],
];

const conditions = [
    "El servicio corresponde a proyección, revisión y estructuración de documentos jurídicos.",
    "La radicación podrá realizarla la empresa, el interesado o Legalio si se pacta expresamente.",
    "La propuesta no garantiza un resultado judicial o administrativo específico.",
    "La calidad y alcance dependen de la veracidad, suficiencia y oportunidad de la información suministrada.",
    "Toda la información recibida será tratada con estricta confidencialidad.",
    "Los pagos podrán realizarse por documento entregado o mediante corte mensual.",
];

export default function ServiciosJuridicosSummarPage() {
    return (
        <>
            <main className="legalio-summar">
                <section className="ls-hero" id="inicio">
                    <div className="ls-container ls-hero-grid">
                        <div className="ls-hero-copy">
                            <span className="ls-pill">Palmira, 09 de junio de 2026</span>
                            <h1>
                                Propuesta de servicios jurídicos para{" "}
                                <span>SUMMAR TEMPORALES S.A.S</span>
                            </h1>
                            <p>
                                Apoyo externo especializado para proyectar, estructurar y
                                revisar acciones de tutela, derechos de petición,
                                respuestas institucionales e impugnaciones con enfoque
                                preventivo, trazable y estratégico.
                            </p>
                            <div className="ls-actions">
                                <Link className="ls-primary-button" href="#honorarios">
                                    Ver honorarios
                                    <span className="icon-CaretRight" />
                                </Link>
                                <Link className="ls-secondary-button" href={whatsappUrl}>
                                    Hablar con Legalio
                                </Link>
                            </div>
                        </div>

                        <div className="ls-legal-panel" aria-label="Resumen de gestión jurídica">
                            <div className="ls-panel-top">
                                <div>
                                    <small>Gestión jurídica</small>
                                    <strong>Perfil empresarial SUMMAR</strong>
                                </div>
                                <span className="icon-Certificate" />
                            </div>
                            <div className="ls-panel-list">
                                <div>
                                    <span className="icon-FileDoc" />
                                    <p>Derechos de petición y tutelas</p>
                                    <strong>En revisión</strong>
                                </div>
                                <div>
                                    <span className="icon-FingerprintSimple" />
                                    <p>Soportes y anexos</p>
                                    <strong>Centralizados</strong>
                                </div>
                                <div>
                                    <span className="icon-ClockCountdown" />
                                    <p>Tiempos de entrega</p>
                                    <strong>12 a 72 h</strong>
                                </div>
                            </div>
                            <div className="ls-panel-stat">
                                <strong>70%-80%</strong>
                                <span>Meta interna de favorabilidad en casos viables</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ls-section ls-section-white">
                    <div className="ls-container">
                        <div className="ls-section-heading ls-centered">
                            <span className="ls-kicker">Presentación</span>
                            <h2>Más que redactar documentos jurídicos</h2>
                            <p>
                                Cada actuación busca proteger los intereses de la empresa,
                                disminuir reclamaciones, evitar contingencias futuras y
                                fortalecer la posición institucional frente a terceros,
                                autoridades y escenarios judiciales.
                            </p>
                        </div>
                        <div className="ls-diff-grid">
                            {differentiators.map((item) => (
                                <article className="ls-diff-card" key={item.title}>
                                    <span className={`ls-diff-icon ${item.icon}`} />
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ls-section ls-about">
                    <Image
                        alt="Equipo jurídico revisando documentos empresariales"
                        className="ls-about-image"
                        fill
                        sizes="100vw"
                        src="/assets/images/section/section-about.jpg"
                    />
                    <div className="ls-container ls-about-content">
                        <div>
                            <span className="ls-kicker ls-kicker-gold">Quiénes somos</span>
                            <h2>Legalio Abogados combina derecho, tecnología y experiencia de usuario</h2>
                        </div>
                        <div className="ls-team-grid">
                            {team.map((item) => (
                                <article key={item.title}>
                                    <span />
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ls-section ls-platform">
                    <div className="ls-container ls-platform-grid">
                        <div className="ls-platform-copy">
                            <span className="ls-kicker">Plataforma y gestión documental</span>
                            <h2>Un perfil propio para controlar solicitudes, soportes y entregas</h2>
                            <p>
                                SUMMAR no dependerá únicamente de correos, chats o archivos
                                dispersos. La plataforma permite organizar la gestión
                                jurídica y documental de múltiples casos de manera
                                transparente, verificable y útil.
                            </p>
                        </div>
                        <div className="ls-platform-card">
                            {platformItems.map((item) => (
                                <div key={item}>
                                    <span className="icon-CheckCircle" />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ls-section ls-section-white">
                    <div className="ls-container ls-objectives-grid">
                        <div>
                            <span className="ls-kicker">Objetivo general</span>
                            <h2>Responder de manera oportuna, estratégica y jurídicamente sólida</h2>
                            <p>
                                El servicio brinda apoyo jurídico externo para elaborar y
                                revisar documentos constitucionales y administrativos que
                                puedan comprometer intereses, derechos, recursos, imagen o
                                estabilidad operativa de la empresa.
                            </p>
                        </div>
                        <ul className="ls-check-list">
                            {objectives.map((item) => (
                                <li key={item}>
                                    <span className="icon-CheckCircle" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="ls-section ls-scope" id="alcance">
                    <div className="ls-container">
                        <div className="ls-section-heading ls-centered">
                            <span className="ls-kicker">Alcance del servicio</span>
                            <h2>Documentos listos para actuar con respaldo</h2>
                        </div>
                        <div className="ls-scope-grid">
                            {scope.map((group) => (
                                <article className="ls-scope-card" key={group.title}>
                                    <h3>{group.title}</h3>
                                    <ul>
                                        {group.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ls-section ls-process" id="metodologia">
                    <div className="ls-container">
                        <div className="ls-section-heading ls-centered">
                            <span className="ls-kicker">Metodología</span>
                            <h2>Una ruta práctica, ágil y trazable</h2>
                        </div>
                        <div className="ls-process-grid">
                            {process.map((step, index) => (
                                <article className="ls-process-step" key={step}>
                                    <span>{String(index + 1).padStart(2, "0")}</span>
                                    <h3>{step}</h3>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ls-section ls-section-white" id="honorarios">
                    <div className="ls-container">
                        <div className="ls-section-heading ls-centered">
                            <span className="ls-kicker">Tiempos y honorarios</span>
                            <h2>Costos previsibles y tiempos de respuesta claros</h2>
                        </div>
                        <div className="ls-table-grid">
                            <article className="ls-table-card">
                                <h3>Tiempos de entrega</h3>
                                <div className="ls-table">
                                    {deliveryTimes.map(([service, time]) => (
                                        <div className="ls-table-row" key={service}>
                                            <span>{service}</span>
                                            <strong>{time}</strong>
                                        </div>
                                    ))}
                                </div>
                            </article>
                            <article className="ls-table-card">
                                <h3>Honorarios propuestos</h3>
                                <div className="ls-table">
                                    {fees.map(([service, value]) => (
                                        <div className="ls-table-row" key={service}>
                                            <span>{service}</span>
                                            <strong>{value}</strong>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </div>
                        <p className="ls-note">
                            Los valores no incluyen IVA, retenciones, autenticaciones,
                            copias, mensajería, desplazamientos o costos externos. Los
                            tiempos dependen de la entrega oportuna de información y pueden
                            ajustarse según términos fijados por autoridad competente.
                        </p>
                    </div>
                </section>

                <section className="ls-quote-section">
                    <div className="ls-container ls-quote-wrap">
                        <span className="ls-quote-mark icon-quote-line" />
                        <blockquote>
                            La empresa no solo recibe un documento jurídico, sino una
                            herramienta para tomar mejores decisiones, actuar oportunamente
                            y defender sus objetivos institucionales con mayor orden y
                            respaldo.
                        </blockquote>
                        <p>Propuesta de valor Legalio Abogados</p>
                    </div>
                </section>

                <section className="ls-section ls-conditions">
                    <div className="ls-container ls-conditions-grid">
                        <div>
                            <span className="ls-kicker">Condiciones del servicio</span>
                            <h2>Confidencialidad, viabilidad y trabajo por caso concreto</h2>
                            <p>
                                Los documentos serán elaborados conforme a la situación
                                específica y no mediante formatos genéricos. Cuando un caso
                                no sea jurídicamente viable, se informará y recomendará la
                                alternativa más adecuada para reducir el riesgo.
                            </p>
                        </div>
                        <ul>
                            {conditions.map((item) => (
                                <li key={item}>
                                    <span className="icon-CheckCircle" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="ls-final-cta">
                    <div className="ls-container">
                        <h2>Legalio como aliado estratégico de SUMMAR TEMPORALES S.A.S</h2>
                        <p>
                            Estamos listos para apoyar decisiones jurídicas más ordenadas,
                            oportunas y preventivas.
                        </p>
                        <Link href={whatsappUrl}>
                            Contactar a Legalio
                            <span className="icon-CaretRight" />
                        </Link>
                    </div>
                </section>
            </main>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    .legalio-summar {
                        --ls-surface: #fbf8fe;
                        --ls-surface-low: #f5f2f9;
                        --ls-surface-high: #e9e7ed;
                        --ls-white: #ffffff;
                        --ls-primary: #00031b;
                        --ls-primary-container: #031756;
                        --ls-primary-muted: #334380;
                        --ls-text: #1b1b20;
                        --ls-muted: #5c617c;
                        --ls-border: #d8d5df;
                        --ls-gold: #ffdf9f;
                        --ls-gold-strong: #f7be2e;
                        --ls-gold-text: #5c4300;
                        --ls-font-display: var(--legalio-serif), Georgia, serif;
                        background: var(--ls-surface);
                        color: var(--ls-text);
                        font-size: 18px;
                        line-height: 1.5;
                        min-height: 100vh;
                        overflow-x: clip;
                        scroll-behavior: smooth;
                    }

                    .legalio-summar *,
                    .legalio-summar *::before,
                    .legalio-summar *::after {
                        box-sizing: border-box;
                    }

                    .legalio-summar a {
                        color: inherit;
                        text-decoration: none;
                    }

                    .ls-container {
                        width: min(100% - 48px, 1280px);
                        margin: 0 auto;
                    }

                    .ls-hero {
                        background: radial-gradient(circle at 86% 24%, rgba(255, 223, 159, 0.55), transparent 28%),
                            linear-gradient(135deg, var(--ls-surface-low), #ffffff 70%);
                        min-height: 780px;
                        overflow: hidden;
                        padding: 168px 0 96px;
                        position: relative;
                    }

                    .ls-hero-grid {
                        align-items: center;
                        display: grid;
                        gap: 64px;
                        grid-template-columns: minmax(0, 1fr) minmax(380px, 0.88fr);
                    }

                    .ls-pill,
                    .ls-kicker {
                        border-radius: 999px;
                        display: inline-flex;
                        font-size: 15px;
                        font-weight: 800;
                        line-height: 1.3;
                        margin-bottom: 22px;
                        padding: 7px 16px;
                    }

                    .ls-pill {
                        background: var(--ls-gold);
                        color: var(--ls-gold-text);
                    }

                    .ls-kicker {
                        background: rgba(3, 23, 86, 0.08);
                        color: var(--ls-primary-muted);
                    }

                    .ls-kicker-gold {
                        background: rgba(255, 223, 159, 0.95);
                        color: var(--ls-gold-text);
                    }

                    .ls-hero h1,
                    .ls-section-heading h2,
                    .ls-platform-copy h2,
                    .ls-objectives-grid h2,
                    .ls-conditions-grid h2,
                    .ls-about-content h2,
                    .ls-final-cta h2 {
                        color: var(--ls-primary);
                        font-family: var(--ls-font-display);
                        font-weight: 800;
                        letter-spacing: 0;
                    }

                    .ls-hero h1 {
                        font-size: clamp(46px, 5vw, 82px);
                        line-height: 0.98;
                        margin: 0 0 28px;
                        max-width: 780px;
                    }

                    .ls-hero h1 span {
                        color: var(--ls-primary-muted);
                    }

                    .ls-hero-copy p {
                        color: var(--ls-muted);
                        font-size: 21px;
                        line-height: 1.65;
                        margin: 0 0 34px;
                        max-width: 710px;
                    }

                    .ls-actions {
                        align-items: center;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 14px;
                    }

                    .ls-primary-button,
                    .ls-secondary-button,
                    .ls-final-cta a {
                        align-items: center;
                        border-radius: 999px;
                        display: inline-flex;
                        font-size: 16px;
                        font-weight: 800;
                        gap: 10px;
                        justify-content: center;
                        line-height: 1.2;
                        min-height: 54px;
                        padding: 17px 24px;
                        transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
                    }

                    .ls-primary-button,
                    .ls-final-cta a {
                        background: var(--ls-primary);
                        color: #ffffff !important;
                        box-shadow: 0 20px 34px rgba(0, 3, 27, 0.18);
                    }

                    .ls-secondary-button {
                        background: #ffffff;
                        border: 1px solid var(--ls-border);
                        color: var(--ls-primary) !important;
                    }

                    .ls-primary-button span,
                    .ls-secondary-button span,
                    .ls-final-cta a span {
                        color: inherit !important;
                    }

                    .ls-primary-button:hover,
                    .ls-secondary-button:hover,
                    .ls-final-cta a:hover {
                        transform: translateY(-2px);
                    }

                    .ls-legal-panel {
                        background: rgba(255, 255, 255, 0.9);
                        border: 1px solid rgba(216, 213, 223, 0.9);
                        border-radius: 8px;
                        box-shadow: 0 28px 80px rgba(0, 3, 27, 0.12);
                        padding: 28px;
                    }

                    .ls-panel-top {
                        align-items: center;
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 24px;
                    }

                    .ls-panel-top small,
                    .ls-panel-stat span {
                        color: var(--ls-muted);
                        display: block;
                        font-size: 14px;
                    }

                    .ls-panel-top strong {
                        color: var(--ls-primary);
                        display: block;
                        font-size: 24px;
                        margin-top: 4px;
                    }

                    .ls-panel-top > span {
                        align-items: center;
                        background: var(--ls-gold);
                        border-radius: 50%;
                        color: var(--ls-gold-text);
                        display: inline-flex;
                        font-size: 28px;
                        height: 58px;
                        justify-content: center;
                        width: 58px;
                    }

                    .ls-panel-list {
                        display: grid;
                        gap: 14px;
                    }

                    .ls-panel-list div {
                        align-items: center;
                        background: var(--ls-surface-low);
                        border: 1px solid var(--ls-border);
                        border-radius: 8px;
                        display: grid;
                        gap: 14px;
                        grid-template-columns: 44px 1fr auto;
                        padding: 16px;
                    }

                    .ls-panel-list span {
                        align-items: center;
                        background: #ffffff;
                        border-radius: 50%;
                        color: var(--ls-primary-muted);
                        display: inline-flex;
                        height: 44px;
                        justify-content: center;
                        width: 44px;
                    }

                    .ls-panel-list p {
                        color: var(--ls-text);
                        font-weight: 800;
                        margin: 0;
                    }

                    .ls-panel-list strong {
                        color: var(--ls-primary-muted);
                        font-size: 14px;
                        text-align: right;
                    }

                    .ls-panel-stat {
                        background: var(--ls-primary);
                        border-radius: 8px;
                        color: #ffffff;
                        margin-top: 18px;
                        padding: 24px;
                    }

                    .ls-panel-stat strong {
                        display: block;
                        font-family: var(--ls-font-display);
                        font-size: 48px;
                        line-height: 1;
                        margin-bottom: 8px;
                    }

                    .ls-panel-stat span {
                        color: rgba(255, 255, 255, 0.72);
                    }

                    .ls-section {
                        padding: 104px 0;
                    }

                    .ls-section-white {
                        background: #ffffff;
                    }

                    .ls-centered {
                        margin: 0 auto 48px;
                        max-width: 820px;
                        text-align: center;
                    }

                    .ls-section-heading h2,
                    .ls-platform-copy h2,
                    .ls-objectives-grid h2,
                    .ls-conditions-grid h2,
                    .ls-about-content h2 {
                        font-size: clamp(34px, 4vw, 56px);
                        line-height: 1.04;
                        margin: 0;
                    }

                    .ls-section-heading p,
                    .ls-platform-copy p,
                    .ls-objectives-grid p,
                    .ls-conditions-grid p {
                        color: var(--ls-muted);
                        font-size: 19px;
                        line-height: 1.65;
                        margin: 18px 0 0;
                    }

                    .ls-diff-grid,
                    .ls-team-grid,
                    .ls-scope-grid,
                    .ls-table-grid {
                        display: grid;
                        gap: 24px;
                    }

                    .ls-diff-grid {
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                    }

                    .ls-diff-card,
                    .ls-scope-card,
                    .ls-table-card {
                        background: #ffffff;
                        border: 1px solid var(--ls-border);
                        border-radius: 8px;
                        padding: 28px;
                    }

                    .ls-section-white .ls-diff-card,
                    .ls-section-white .ls-scope-card,
                    .ls-section-white .ls-table-card {
                        background: var(--ls-surface-low);
                    }

                    .ls-diff-icon {
                        align-items: center;
                        background: var(--ls-primary);
                        border-radius: 50%;
                        color: #ffffff;
                        display: inline-flex;
                        font-size: 28px;
                        height: 60px;
                        justify-content: center;
                        margin-bottom: 26px;
                        width: 60px;
                    }

                    .ls-diff-card h3,
                    .ls-team-grid h3,
                    .ls-scope-card h3,
                    .ls-table-card h3,
                    .ls-process-step h3 {
                        color: var(--ls-primary);
                        font-size: 22px;
                        font-weight: 900;
                        line-height: 1.18;
                        margin: 0 0 12px;
                    }

                    .ls-diff-card p,
                    .ls-team-grid p {
                        color: var(--ls-muted);
                        margin: 0;
                    }

                    .ls-about {
                        color: #ffffff;
                        min-height: 680px;
                        overflow: hidden;
                        position: relative;
                    }

                    .ls-about::before {
                        background: linear-gradient(90deg, rgba(0, 3, 27, 0.86), rgba(0, 3, 27, 0.52), rgba(0, 3, 27, 0.2));
                        content: "";
                        inset: 0;
                        position: absolute;
                        z-index: 1;
                    }

                    .ls-about-image {
                        object-fit: cover;
                        z-index: 0;
                    }

                    .ls-about-content {
                        display: grid;
                        gap: 48px;
                        grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
                        position: relative;
                        z-index: 2;
                    }

                    .ls-about-content h2 {
                        color: #ffffff;
                    }

                    .ls-team-grid {
                        grid-template-columns: 1fr;
                    }

                    .ls-team-grid article {
                        background: rgba(255, 255, 255, 0.11);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 8px;
                        padding: 24px;
                    }

                    .ls-team-grid article > span {
                        background: var(--ls-gold-strong);
                        display: block;
                        height: 3px;
                        margin-bottom: 18px;
                        width: 44px;
                    }

                    .ls-team-grid h3,
                    .ls-team-grid p {
                        color: #ffffff;
                    }

                    .ls-team-grid p {
                        color: rgba(255, 255, 255, 0.76);
                    }

                    .ls-platform-grid,
                    .ls-objectives-grid,
                    .ls-conditions-grid {
                        align-items: start;
                        display: grid;
                        gap: 56px;
                        grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
                    }

                    .ls-platform-card {
                        background: #ffffff;
                        border: 1px solid var(--ls-border);
                        border-radius: 8px;
                        box-shadow: 0 22px 54px rgba(0, 3, 27, 0.08);
                        display: grid;
                        gap: 12px;
                        padding: 24px;
                    }

                    .ls-platform-card div,
                    .ls-check-list li,
                    .ls-conditions-grid li {
                        align-items: flex-start;
                        display: flex;
                        gap: 12px;
                    }

                    .ls-platform-card div {
                        background: var(--ls-surface-low);
                        border-radius: 8px;
                        padding: 16px;
                    }

                    .ls-platform-card span,
                    .ls-check-list span,
                    .ls-conditions-grid span {
                        color: var(--ls-primary-muted);
                        flex: 0 0 auto;
                        margin-top: 3px;
                    }

                    .ls-platform-card p {
                        margin: 0;
                    }

                    .ls-check-list,
                    .ls-conditions-grid ul {
                        display: grid;
                        gap: 16px;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }

                    .ls-check-list li,
                    .ls-conditions-grid li {
                        background: var(--ls-surface-low);
                        border: 1px solid var(--ls-border);
                        border-radius: 8px;
                        color: var(--ls-text);
                        font-weight: 700;
                        padding: 16px;
                    }

                    .ls-scope {
                        background: linear-gradient(180deg, var(--ls-surface), #ffffff);
                    }

                    .ls-scope-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }

                    .ls-scope-card ul {
                        color: var(--ls-muted);
                        display: grid;
                        gap: 10px;
                        margin: 0;
                        padding-left: 20px;
                    }

                    .ls-process {
                        background: var(--ls-primary);
                        color: #ffffff;
                    }

                    .ls-process .ls-kicker {
                        background: rgba(255, 255, 255, 0.12);
                        color: var(--ls-gold);
                    }

                    .ls-process h2 {
                        color: #ffffff;
                    }

                    .ls-process-grid {
                        display: grid;
                        gap: 16px;
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                    }

                    .ls-process-step {
                        background: rgba(255, 255, 255, 0.08);
                        border: 1px solid rgba(255, 255, 255, 0.14);
                        border-radius: 8px;
                        min-height: 148px;
                        padding: 24px;
                    }

                    .ls-process-step span {
                        color: var(--ls-gold);
                        display: block;
                        font-family: var(--ls-font-display);
                        font-size: 38px;
                        font-weight: 900;
                        line-height: 1;
                        margin-bottom: 18px;
                    }

                    .ls-process-step h3 {
                        color: #ffffff;
                        margin: 0;
                    }

                    .ls-table-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .ls-table-card h3 {
                        margin-bottom: 22px;
                    }

                    .ls-table {
                        display: grid;
                        gap: 10px;
                    }

                    .ls-table-row {
                        align-items: center;
                        background: #ffffff;
                        border: 1px solid var(--ls-border);
                        border-radius: 8px;
                        display: grid;
                        gap: 16px;
                        grid-template-columns: minmax(0, 1fr) auto;
                        padding: 15px 16px;
                    }

                    .ls-table-row span {
                        color: var(--ls-muted);
                    }

                    .ls-table-row strong {
                        color: var(--ls-primary);
                        font-size: 16px;
                        text-align: right;
                    }

                    .ls-note {
                        color: var(--ls-muted);
                        font-size: 15px;
                        line-height: 1.6;
                        margin: 22px auto 0;
                        max-width: 920px;
                        text-align: center;
                    }

                    .ls-quote-section {
                        background: var(--ls-gold);
                        padding: 80px 0;
                    }

                    .ls-quote-wrap {
                        max-width: 1000px;
                        text-align: center;
                    }

                    .ls-quote-mark {
                        color: var(--ls-gold-text);
                        display: inline-block;
                        font-size: 42px;
                        margin-bottom: 20px;
                    }

                    .ls-quote-wrap blockquote {
                        color: var(--ls-primary);
                        font-family: var(--ls-font-display);
                        font-size: clamp(30px, 4vw, 54px);
                        font-weight: 800;
                        line-height: 1.08;
                        margin: 0;
                    }

                    .ls-quote-wrap p {
                        color: var(--ls-gold-text);
                        font-weight: 900;
                        margin: 22px 0 0;
                    }

                    .ls-conditions {
                        background: #ffffff;
                    }

                    .ls-final-cta {
                        background: linear-gradient(135deg, var(--ls-primary), #111b4f);
                        color: #ffffff;
                        padding: 82px 0;
                        text-align: center;
                    }

                    .ls-final-cta h2 {
                        color: #ffffff;
                        font-size: clamp(36px, 4.4vw, 64px);
                        line-height: 1.02;
                        margin: 0 auto 16px;
                        max-width: 840px;
                    }

                    .ls-final-cta p {
                        color: rgba(255, 255, 255, 0.72);
                        font-size: 20px;
                        margin: 0 auto 28px;
                        max-width: 680px;
                    }

                    .ls-final-cta a {
                        background: var(--ls-gold);
                        color: var(--ls-primary) !important;
                        box-shadow: none;
                    }

                    @media (max-width: 1100px) {
                        .ls-hero-grid,
                        .ls-about-content,
                        .ls-platform-grid,
                        .ls-objectives-grid,
                        .ls-conditions-grid {
                            grid-template-columns: 1fr;
                        }

                        .ls-diff-grid,
                        .ls-process-grid {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }

                        .ls-scope-grid {
                            grid-template-columns: 1fr;
                        }
                    }

                    @media (max-width: 760px) {
                        .ls-container {
                            width: min(100% - 32px, 1280px);
                        }

                        .ls-hero {
                            min-height: auto;
                            padding: 122px 0 70px;
                        }

                        .ls-hero h1 {
                            font-size: 43px;
                        }

                        .ls-hero-copy p {
                            font-size: 18px;
                        }

                        .ls-actions,
                        .ls-primary-button,
                        .ls-secondary-button,
                        .ls-final-cta a {
                            width: 100%;
                        }

                        .ls-legal-panel {
                            padding: 18px;
                        }

                        .ls-panel-list div,
                        .ls-table-row {
                            grid-template-columns: 1fr;
                        }

                        .ls-panel-list strong,
                        .ls-table-row strong {
                            text-align: left;
                        }

                        .ls-section {
                            padding: 72px 0;
                        }

                        .ls-section-heading {
                            margin-bottom: 34px;
                        }

                        .ls-section-heading h2,
                        .ls-platform-copy h2,
                        .ls-objectives-grid h2,
                        .ls-conditions-grid h2,
                        .ls-about-content h2 {
                            font-size: 36px;
                        }

                        .ls-diff-grid,
                        .ls-process-grid,
                        .ls-table-grid {
                            grid-template-columns: 1fr;
                        }

                        .ls-diff-card,
                        .ls-scope-card,
                        .ls-table-card {
                            padding: 22px;
                        }

                        .ls-about {
                            min-height: auto;
                        }
                    }
                    `,
                }}
            />
        </>
    );
}
