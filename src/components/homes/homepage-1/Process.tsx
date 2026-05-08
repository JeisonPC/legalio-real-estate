"use client";

import React, { useRef } from "react";
import { useScopedAnimations } from "@/components/common/useScopedAnimations";

export default function Process() {
    const rootRef = useRef<HTMLDivElement>(null);

    useScopedAnimations(rootRef, []);

    return (
        <div ref={rootRef} className="section-process-1">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner-3.jpg")',
                }}
            >
                <div className="tf-container">
                    <div className="box scrolling-effect effectFade">
                        <div className="heading-section mb_32">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Nuestro proceso
                            </span>
                            <h3>Pasos para Comprar una Casa</h3>
                        </div>
                        <div className="wrap-process">
                            <div className="process-item style-1">
                                <span className="number h5">01.</span>
                                <div className="content">
                                    <h5 className="mb_8">
                                        Descubre tu casa de ensueño
                                    </h5>
                                    <p>
                                        Explora una selección curada de
                                        propiedades adaptadas a tu estilo de vida
                                        y presupuesto.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">02.</span>
                                <div className="content">
                                    <h5 className="mb_8">Programa una Visita</h5>
                                    <p>
                                        Reserva un recorrido a tu conveniencia y
                                        explora el espacio en persona o
                                        virtualmente.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">03.</span>
                                <div className="content">
                                    <h5 className="mb_8">Cierra el Trato</h5>
                                    <p>
                                        Obtén orientación experta para finalizar
                                        la documentación y mudarte a tu nuevo hogar
                                        con confianza.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
