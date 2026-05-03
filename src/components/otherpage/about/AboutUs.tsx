import React from "react";
import OdometerCounter from "@/components/common/Odometer";
export default function AboutUs() {
    return (
        <div className="tf-container section-about">
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-uppercase fw-6">Acerca de</span>
                <h3 className="split-text split-lines-rotation-x">
                    Su socio confiable para el <br /> Éxito Inmobiliario.
                </h3>
            </div>
            <div
                className="parallaxie"
                style={{
                    background:
                        'url("/assets/images/section/section-about.jpg")',
                }}
            >
                <div className="content">
                    <div className="wrap d-flex flex-column">
                        {/* <div className="tf-box-icon style-1">
                            <div className="heading d-flex justify-content-between mb_19">
                                <div className="counter-item style-default h2">
                                    <OdometerCounter value={112} />
                                </div>
                                <div className="icon">
                                    <i className="icon-Certificate"></i>
                                </div>
                            </div>
                            <h6 className="text_secondary-color sub">
                                Awards Received
                            </h6>
                        </div> */}
                        <div className="d-flex gap_12 bot">
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={85} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-BuildingOffice"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub">
                                    Clientes Satisfechos
                                </h6>
                            </div>
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={66} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-ChartDonut"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub">
                                    Tráfico Mensual
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tf-grid-layout md-col-2">
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20">
                        <i className="icon-Crown"></i>
                        Nuestra Misión
                    </h4>
                    <p className="mb_8">
                        Simplificar el viaje inmobiliario conectando a las personas
                        con las propiedades adecuadas a través de la confianza, la transparencia
                        y la tecnología.
                    </p>
                    <p>
                        Estamos comprometidos a ofrecer experiencias personalizadas,
                        ya sea que esté comprando, vendiendo o alquilando. Nos
                        adaptamos a nuevas tecnologías y tendencias del mercado para ofrecer
                        soluciones inmobiliarias más inteligentes, rápidas y eficientes.
                    </p>
                </div>
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20">
                        <i className="icon-Target"></i>
                        Nuestra Visión
                    </h4>
                    <p className="mb_8">
                        Convertirse en el socio inmobiliario más confiable al
                        redefinir cómo las personas descubren, evalúan y se relacionan
                        con las propiedades.
                    </p>
                    <p>
                        Visualizamos un futuro donde cada individuo pueda encontrar
                        su hogar o inversión ideal con confianza,
                        respaldado por la innovación, la integridad y un profundo
                        entendimiento de las necesidades del mercado.
                    </p>
                </div>
            </div>
        </div>
    );
}
