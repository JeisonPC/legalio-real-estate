import React from "react";

export default function Overview() {
    return (
        <div>
            <h5 className="properties-title mb_20">Descripción General</h5>
            <div className="tf-grid-layout tf-col-2 xl-col-4 md-col-3">
                <div className="item d-flex gap_16">
                    <i className="icon icon-HouseSimple"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">ID:</span>
                        <span className="text-title fw-6 text_primary-color">
                            423146
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-SlidersHorizontal"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Type:</span>
                        <span className="text-title fw-6 text_primary-color">
                            Villa
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Bed"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Habitaciones:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3 Habitaciones
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Shower"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Bathrooms:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3 Baños
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Warehouse"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Garages:</span>
                        <span className="text-title fw-6 text_primary-color">
                            Yes
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Ruler"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Size:</span>
                        <span className="text-title fw-6 text_primary-color">
                            54 m²
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Crop"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Land area:</span>
                        <span className="text-title fw-6 text_primary-color">
                            4,200 SqFt
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-CalendarBlank"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Año de construcción:</span>
                        <span className="text-title fw-6 text_primary-color">
                            2024
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
