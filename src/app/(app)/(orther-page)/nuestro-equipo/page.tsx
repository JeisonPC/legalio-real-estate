import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/layouts/Layout-defaul";

const phoneNumber = "3046035418";
const whatsappBaseUrl = "https://wa.me/573046035418";

const teamMembers = [
    {
        name: "Tania Narvaez Loaiza",
        role: "Psicóloga y Magister en UX",
        image: "/assets/images/section/agent-1.png",
        description:
            "Integra psicología, experiencia de usuario y sensibilidad comercial para entender las necesidades de cada cliente y convertir procesos inmobiliarios complejos en decisiones claras, humanas y confiables.",
        focus: "Relación con clientes y seguimiento comercial",
        email: "tania@legalio.com.co",
    },
    {
        name: "Jeison Poveda",
        role: "Ingeniero Informático y Especialista en Gestión de Proyectos",
        image: "/assets/images/section/agent-2.png",
        description:
            "Diseña soluciones tecnológicas y gestiona proyectos digitales que fortalecen la operación de Legalio, optimizando trámites, automatizando procesos y dando trazabilidad a cada etapa del servicio.",
        focus: "Automatización, producto y operación digital",
        email: "jeison@legalio.com.co",
    },
    {
        name: "Andrea Narvaez Loaiza",
        role: "Abogada y Magister en LegalTech",
        image: "/assets/images/section/agent-3.png",
        description:
            "Apoya la revisión documental y el acompañamiento administrativo para que cada operación tenga respaldo y confianza.",
        focus: "Contratos, documentos y soporte operativo",
        email: "andrea@legalio.com.co",
    },
];

function whatsappUrl(name: string) {
    return `${whatsappBaseUrl}?text=${encodeURIComponent(
        `Hola Legalio, quiero contactar a ${name} del equipo.`,
    )}`;
}

export const metadata: Metadata = {
    title: "Nuestro Equipo | Legalio",
    description:
        "Conoce el equipo de Legalio: acompañamiento inmobiliario, soporte legal, tecnología y gestión comercial para comprar, vender o arrendar con confianza.",
    alternates: {
        canonical: "/nuestro-equipo",
    },
};

export default function NuestroEquipoPage() {
    return (
        <Layout>
            <div className="page-title style-default">
                <div className="thumbs">
                    <Image
                        src="/assets/images/page-title/page-title-13.webp"
                        width={1920}
                        height={300}
                        alt=""
                        priority
                    />
                </div>
                <div className="content text-center">
                    <div className="tf-container">
                        <h2 className="title text_white mb_12">Nuestro Equipo</h2>
                        <ul className="breadcrumb justify-content-center text-button fw-4">
                            <li>
                                <Link href="/">Inicio</Link>
                            </li>
                            <li>Nuestro Equipo</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="tf-container tf-spacing-1">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-9">
                        <div className="heading-section text-center mb_48">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Equipo Legalio
                            </span>
                            <h3>Personas que combinan criterio inmobiliario y respaldo legal</h3>
                            <p className="text-body-2 mt-3">
                                Somos un equipo cercano, práctico y enfocado en que cada
                                proceso de compra, venta o arriendo avance con claridad.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {teamMembers.map((member) => (
                        <div className="col-lg-4 col-md-6" key={member.name}>
                            <article className="box-sellers style-1 h-100 d-flex flex-column">
                                <div className="author mb_28">
                                    <div className="avatar mb_28">
                                        <Image
                                            src={member.image}
                                            width={354}
                                            height={354}
                                            alt={member.name}
                                        />
                                    </div>
                                    <div className="author-info d-flex flex-column">
                                        <h5 className="mb_4">{member.name}</h5>
                                        <p className="mb_12 text_secondary-color fw-6">
                                            {member.role}
                                        </p>
                                        <p>{member.description}</p>
                                    </div>
                                </div>

                                <div className="mb_28">
                                    <h6 className="mb_16">Información</h6>
                                    <ul className="info">
                                        <li className="item d-flex gap_12 mb_20">
                                            <i className="icon icon-Certificate"></i>
                                            <div>
                                                <p className="text_primary-color mb_4">
                                                    {member.focus}
                                                </p>
                                                <Link
                                                    href="/sobre-nosotros"
                                                    className="hover-underline-link text-button fw-7 text_primary-color"
                                                >
                                                    Conocer Legalio
                                                </Link>
                                            </div>
                                        </li>
                                        <li className="item d-flex gap_12 align-items-center">
                                            <i className="icon icon-PhoneCall"></i>
                                            <div>
                                                <p className="text_primary-color">{phoneNumber}</p>
                                                <Link
                                                    href={`mailto:${member.email}`}
                                                    className="text_secondary-color text-body-default link"
                                                >
                                                    {member.email}
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <Link
                                        href={`tel:${phoneNumber}`}
                                        className="tf-btn btn-bg-1 w-full mb_12"
                                    >
                                        <span className="d-flex align-items-center gap_8">
                                            <i className="icon-PhoneCall"></i>
                                            Llamar al equipo
                                        </span>
                                        <span className="bg-effect"></span>
                                    </Link>
                                    <Link
                                        href={whatsappUrl(member.name)}
                                        className="tf-btn btn-bg-1 w-full mb_12"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="d-flex align-items-center gap_8">
                                            <i className="icon-ChatCircleDots"></i>
                                            Chat vía WhatsApp
                                        </span>
                                        <span className="bg-effect"></span>
                                    </Link>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            <section className="tf-container pb-5">
                <div className="form-account text-center">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        Atención personalizada
                    </span>
                    <h3 className="mt-3 mb_16">Hablemos de tu próximo movimiento inmobiliario</h3>
                    <p className="text-body-2 mb_24">
                        Te orientamos para comprar, vender, arrendar o administrar tu
                        inmueble con acompañamiento profesional de principio a fin.
                    </p>
                    <Link
                        href={whatsappUrl("Legalio")}
                        className="tf-btn btn-bg-1 btn-px-24"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="d-flex align-items-center gap_8">
                            Contactar ahora
                            <i className="icon-CaretRight"></i>
                        </span>
                        <span className="bg-effect"></span>
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
