import Link from "next/link";
import React from "react";

const features = [
    {
        icon: "icon-Lifebuoy",
        title: "Soporte Personalizado",
        description:
            "Recibe asistencia personalizada de nuestro equipo experimentado para asegurar que cada paso se ajuste a tus necesidades y objetivos específicos.",
    },
    {
        icon: "icon-ClockCountdown",
        title: "Proceso que Ahorra Tiempo",
        description:
            "Desde respuestas rápidas hasta procedimientos optimizados, valoramos tu tiempo y te ayudamos a avanzar sin demoras.",
    },
    {
        icon: "icon-SketchLogo",
        title: "Experiencia Confiable",
        description:
            "Trabaja con profesionales que aportan un profundo conocimiento del sector y estrategias comprobadas para guiar tus decisiones con confianza.",
    },
];

export default function WhyChoose() {
    return (
        <div className="tf-container">
            <div className="wrap-heading-section d-flex justify-content-between align-items-center mb_48">
                <div className="heading-section">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        ¿Por qué elegirnos?
                    </span>
                    <h3 className="text_white split-text effect-blur-fade">
                        Experimenta la diferencia <br />
                        con nuestras soluciones
                    </h3>
                </div>
                <Link href="/contacto" className="tf-btn btn-bg-white btn-px-32">
                    <span>Contáctanos</span>
                    <span className="bg-effect"></span>
                </Link>
            </div>
            <div className="tf-grid-layout md-col-3">
                {features.map((item, index) => (
                    <div className="tf-box-icon style-2" key={index}>
                        <div className="icon mb_24">
                            <i className={item.icon}></i>
                        </div>
                        <div className="content">
                            <h5 className="text_white mb_8">{item.title}</h5>
                            <p className="text_secondary-color-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
