import React from "react";

export default function Nearby() {
    return (
        <>
            <h5 className="properties-title mb_20">¿Qué hay cerca?</h5>
            <p className="text-body-2">
                Ya sea que estés criando una familia o disfrutando de un retiro
                tranquilo, apreciarás la proximidad a servicios esenciales,
                espacios verdes y opciones de entretenimiento.
            </p>
            <div className="wrap ">
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">Escuela:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.7 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Supermercado:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Clínica:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.6 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Parque:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.1 Km
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">
                            Estadio Deportivo:
                        </span>
                        <span className="text-button fw-7 text_primary-color">
                            0.4 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Farmacia:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.8 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Café:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Centro Comercial:</span>
                        <span className="text-button fw-7 text_primary-color">
                            2.1 Km
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">Centro:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.4 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Centro de la Ciudad:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.8 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Viñedo:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 Km
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
}
