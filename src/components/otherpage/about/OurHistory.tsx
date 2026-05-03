import React from "react";

type TimeLine = {
    year: string;
    title: string;
    text: string;
};

const history: TimeLine[] = [
    {
        year: "2009",
        title: "Comienzos Humildes",
        text: "Comenzamos como una pequeña agencia local con una misión clara: ayudar a las personas a encontrar hogares con honestidad y cuidado.",
    },
    {
        year: "2015",
        title: "Un Nombre Confiable",
        text: "Ganamos reconocimiento por nuestro servicio confiable y construimos relaciones a largo plazo con clientes y socios.",
    },
    {
        year: "2018",
        title: "Adoptando la Innovación",
        text: "Adoptamos nuevas tecnologías para agilizar la búsqueda de propiedades y mejorar la experiencia del cliente.",
    },
    {
        year: "2021",
        title: "Más de 1,000 Hogares Vendidos",
        text: "Alcanzamos un hito importante con más de mil transacciones inmobiliarias exitosas completadas.",
    },
    {
        year: "2024",
        title: "Avanzando Juntos",
        text: "Continuamos creciendo con un equipo dedicado, herramientas modernas y una visión renovada para el futuro.",
    },
];

export default function OurHistory() {
    return (
        <>
            <div className=" t-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        Nuestra Historia
                    </span>
                    <h3 className="split-text effect-blur-fade">Hitos que nos definen</h3>
                </div>
            </div>
            <div className="content">
                <div className="tf-container w-xl">
                    <div className="wrap-time-line">
                        {history.map((item, index) => (
                            <div className="time-item" key={index}>
                                <div className="heading">
                                    <h3 className="mb_8">{item.year}</h3>
                                    <span className="sub text-label text-uppercase fw-6 ">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="dot"></div>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
