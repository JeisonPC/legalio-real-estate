"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import OdometerCounter from "@/components/common/Odometer";

type Tab = {
    id: string;
    title: string;
    content: string;
    image: string;
};

const tabs: Tab[] = [
    {
        id: "tab1",
        title: "Paso 1: Descubre la casa de tus sueños",
        content:
            "Explora una selección curada de propiedades adaptadas a tu estilo de vida y presupuesto.",
        image: "/assets/images/section/process-1.webp",
    },
    {
        id: "tab2",
        title: "Paso 2: Programa una visita",
        content:
            "Reserva una visita a tu conveniencia y explora el espacio en persona o de manera virtual.",
        image: "/assets/images/section/process-2.jpg",
    },
    {
        id: "tab3",
        title: "Paso 3: Cierra el trato",
        content:
            "Obtén orientación experta para finalizar el papeleo y mudarte a tu nuevo hogar con confianza.",
        image: "/assets/images/section/process-3.jpg",
    },
];

export default function Process1() {
    const [activeTab, setActiveTab] = useState("tab1");
    let hoverTimer: ReturnType<typeof setTimeout>;

    const handleMouseEnter = useCallback((tabId: string) => {
        hoverTimer = setTimeout(() => {
            setActiveTab(tabId);
        }, 100);
    }, []);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(hoverTimer);
    }, []); 

    return (
        <div className="section-process tf-spacing-1">
            <div className="tf-container">
                <div className="row tabs-hover-wrap align-items-center">
                    <div className="col-lg-5">
                        <div className="heading-section mb_48">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Nuestro proceso
                            </span>
                            <h3 className="split-text effect-blur-fade">
                                Pasos para Comprar una Casa
                            </h3>
                        </div>
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`process-item item scrolling-effect effectLeft ${
                                    activeTab === tab.id ? "active" : ""
                                }`}
                                onMouseEnter={() => handleMouseEnter(tab.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="line"></span>
                                <div className="content">
                                    <h5 className="title mb_8">{tab.title}</h5>
                                    <p>{tab.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-7">
                        <div className="tab-content-wrap">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    id={tab.id}
                                    className={`tab-content ${
                                        activeTab === tab.id ? "active" : ""
                                    }`}
                                >
                                    <div className="img-style">
                                        <Image
                                            loading="lazy"
                                            src={tab.image}
                                            width={690}
                                            height={518}
                                            alt="process"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="split-text effect-blur-fade">
                        Con la confianza de miles de personas
                    </h3>
                    <div className="wrap-counter">
                        {[
                            // { number: 112, label: "Premios Recibidos" },
                            { number: 85, label: "Clientes Satisfechos" },
                            { number: 66, label: "Tráfico Mensual" },
                            { number: 143, label: "Propiedades Vendidas" },
                        ].map((item, idx) => (
                            <div
                                className="counter-item style-default"
                                key={idx}
                            >
                                <div className="counter-number h1">
                                    <OdometerCounter value={item.number} />
                                </div>
                                <h6 className="text_secondary-color">
                                    {item.label}
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
