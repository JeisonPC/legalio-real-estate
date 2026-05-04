import React from "react";

export default function Banner1() {
    return (
        <div className="banner">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner.jpg")',
                }}
            >
                <div className="tf-container z-5">
                    <h2 className="text_white mb_20">
                        Encuentra tu propiedad, <br />
                        comienza hoy tu camino hacia tener vivienda propia.
                    </h2>
                    <p className="text_white text-body-1">
                        Conéctate con tu asesor en minutos.
                    </p>
                </div>
            </div>
        </div>
    );
}
