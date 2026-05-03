"use client";

import DropdownSelect2 from "@/components/common/DropdownSelect2";
import React, { useState } from "react";
import { submitFAQQuestion } from "@/actions/faqAction";
import Link from "next/link";

const faqGroups = [
    {
        id: "accordion-faq",
        title: "Compra de propiedad",
        items: [
            {
                id: "accordion-faq-1",
                question:
                    "¿Cuál es el proceso para comprar una vivienda de principio a fin?",
                answer: [
                    "El proceso de compra normalmente comienza con la evaluación de tus finanzas y la definición de un presupuesto realista. Luego puedes buscar propiedades que se ajusten a tus necesidades, ubicación y capacidad de pago. Cuando encuentras la opción adecuada, presentas una oferta y, si es aceptada, avanzas hacia la promesa o contrato correspondiente.",
                    "Después vienen la revisión documental, el estudio legal del inmueble, la validación de pagos, la escritura y el registro. En Legalio te acompañamos para que cada etapa tenga respaldo jurídico y puedas tomar decisiones con mayor seguridad.",
                ],
            },
            {
                id: "accordion-faq-2",
                question: "¿Cuánto debería presupuestar para gastos de cierre?",
                answer: [
                    "Los gastos de cierre pueden variar según el tipo de operación, el valor del inmueble, la notaría, impuestos, certificados y costos de registro. También pueden existir gastos asociados a créditos, avalúos o estudios de títulos.",
                    "Lo recomendable es revisar estos valores antes de firmar cualquier compromiso. Así evitas sorpresas y sabes con claridad cuánto dinero necesitas para cerrar la compra.",
                ],
            },
            {
                id: "accordion-faq-3",
                question:
                    "¿Necesito una aprobación de crédito antes de empezar a buscar vivienda?",
                answer: [
                    "No siempre es obligatorio, pero sí es muy recomendable. Tener una preaprobación o claridad sobre tu capacidad de financiación te permite buscar propiedades dentro de un rango realista y negociar con mayor seriedad.",
                    "También ayuda a detectar a tiempo posibles ajustes en documentos, ingresos o historial financiero antes de avanzar en una negociación.",
                ],
            },
            {
                id: "accordion-faq-4",
                question:
                    "¿Qué debo revisar antes de comprar una propiedad?",
                answer: [
                    "Antes de comprar debes revisar la tradición del inmueble, certificados, afectaciones, embargos, hipotecas, paz y salvos, reglamento de propiedad horizontal si aplica, y que la información física coincida con la documentación.",
                    "Una revisión legal previa reduce riesgos y permite negociar o desistir antes de asumir obligaciones importantes.",
                ],
            },
            {
                id: "accordion-faq-5",
                question:
                    "¿Cuánto tiempo suele tardar el cierre de una compraventa?",
                answer: [
                    "El tiempo puede variar según la documentación, la forma de pago, si hay crédito hipotecario y la disponibilidad de las partes. Un proceso simple puede avanzar en pocas semanas, mientras que una operación con crédito o trámites pendientes puede tardar más.",
                    "La clave es reunir documentos desde el inicio y revisar cada paso antes de firmar.",
                ],
            },
        ],
    },
    {
        id: "accordion-faq1",
        title: "Inversión inmobiliaria",
        items: [
            {
                id: "accordion-faq-1-1",
                question:
                    "¿Qué tipo de propiedad es mejor para invertir por primera vez?",
                answer: [
                    "Para un primer inversionista suelen funcionar propiedades fáciles de arrendar, con buena ubicación, demanda estable y costos de mantenimiento razonables. Casas, apartamentos y locales pequeños pueden ser buenas opciones según el mercado.",
                    "La decisión debe basarse en rentabilidad esperada, valorización, facilidad de administración y riesgos legales o comerciales.",
                ],
            },
            {
                id: "accordion-faq-1-2",
                question:
                    "¿Cómo calculo la rentabilidad de una propiedad en arriendo?",
                answer: [
                    "Puedes estimarla comparando el ingreso anual por canon contra el valor total invertido. También debes restar administración, impuestos, seguros, mantenimiento, periodos vacantes y otros costos asociados.",
                    "La rentabilidad real no depende solo del canon. También influyen la estabilidad del arrendatario, la valorización, la ubicación y el estado jurídico del inmueble.",
                ],
            },
            {
                id: "accordion-faq-1-3",
                question:
                    "¿Es mejor invertir en vivienda o en propiedad comercial?",
                answer: [
                    "La vivienda suele tener una demanda más amplia y puede ser más sencilla de administrar. La propiedad comercial puede ofrecer mejores cánones en algunos casos, pero también puede tener vacancias más largas y contratos con condiciones más específicas.",
                    "La mejor opción depende de tu presupuesto, tolerancia al riesgo, horizonte de inversión y conocimiento del mercado local.",
                ],
            },
            {
                id: "accordion-faq-1-4",
                question:
                    "¿Qué beneficios tiene invertir en propiedad raíz?",
                answer: [
                    "La inversión inmobiliaria puede ofrecer ingresos periódicos, valorización en el tiempo y respaldo en un activo tangible. También puede servir para diversificar patrimonio.",
                    "Sin embargo, debe analizarse con cuidado: documentación, ubicación, liquidez, costos, impuestos y riesgos de ocupación o incumplimiento.",
                ],
            },
            {
                id: "accordion-faq-1-5",
                question:
                    "¿Conviene vender rápido o conservar una propiedad a largo plazo?",
                answer: [
                    "Vender rápido puede funcionar si existe una oportunidad clara de valorización o remodelación. Conservar a largo plazo puede generar flujo de caja y valorización sostenida.",
                    "La estrategia adecuada depende de tu objetivo financiero, plazo, liquidez y capacidad para administrar el inmueble.",
                ],
            },
        ],
    },
    {
        id: "accordion-faq2",
        title: "Arriendos y administración de inmuebles",
        items: [
            {
                id: "accordion-faq-2-1",
                question:
                    "¿Qué debe incluir un contrato de arrendamiento?",
                answer: [
                    "Un contrato de arrendamiento debe definir claramente canon, fecha de pago, duración, obligaciones de las partes, servicios, administración, depósito si aplica, reglas de uso, causales de terminación y mecanismos de cobro.",
                    "También es importante que el contrato esté ajustado a la ley aplicable y a las condiciones reales del inmueble.",
                ],
            },
            {
                id: "accordion-faq-2-2",
                question:
                    "¿Cómo filtro correctamente a un posible arrendatario?",
                answer: [
                    "Un buen filtro revisa capacidad de pago, estabilidad laboral o económica, referencias, antecedentes, comportamiento financiero y documentación de soportes.",
                    "Este proceso ayuda a reducir riesgos de mora, daños al inmueble y conflictos durante la relación contractual.",
                ],
            },
            {
                id: "accordion-faq-2-3",
                question:
                    "¿Cuáles son mis responsabilidades como propietario arrendador?",
                answer: [
                    "El propietario debe entregar el inmueble en condiciones adecuadas, respetar lo pactado, atender reparaciones que le correspondan y cumplir la normativa aplicable.",
                    "Una administración ordenada ayuda a mantener una relación clara con el arrendatario y a proteger el valor del inmueble.",
                ],
            },
            {
                id: "accordion-faq-2-4",
                question:
                    "¿Cada cuánto debería inspeccionar una propiedad arrendada?",
                answer: [
                    "Es recomendable realizar inventario de entrega, seguimiento periódico y revisión al finalizar el contrato. La frecuencia depende del tipo de inmueble y de lo pactado con el arrendatario.",
                    "Las visitas deben hacerse con comunicación previa y respetando los derechos de quien ocupa el inmueble.",
                ],
            },
            {
                id: "accordion-faq-2-5",
                question:
                    "¿Qué hago si un arrendatario deja de pagar?",
                answer: [
                    "Lo primero es documentar la mora y comunicarse formalmente. Si no hay solución, deben revisarse las cláusulas del contrato y activar los mecanismos legales o de garantía correspondientes.",
                    "Evita tomar medidas informales que puedan generar problemas legales. Un acompañamiento jurídico oportuno suele prevenir mayores pérdidas.",
                ],
            },
        ],
    },
];

const helpOptions = [
    "Inversión inmobiliaria",
    "Compra de vivienda",
    "Venta de propiedad",
    "Opciones de financiación",
    "Arriendos y administración",
    "Otro",
];

export default function Faqs() {
    const [openItems, setOpenItems] = useState<Record<string, string>>({
        "accordion-faq": "accordion-faq-1",
    });
    const [helpType, setHelpType] = useState(helpOptions[0]);

    const toggleItem = (groupId: string, itemId: string) => {
        setOpenItems((current) => ({
            ...current,
            [groupId]: current[groupId] === itemId ? "" : itemId,
        }));
    };

    return (
        <div className="section-faqs tf-spacing-1">
            <div className="tf-container">
                <div className="row">
                    <div className="col-lg-8">
                        {faqGroups.map((group) => (
                            <div className="faq-item" key={group.id}>
                                <h4 className="mb_18">{group.title}</h4>
                                <ul
                                    className="accordion-wrap"
                                    id={group.id}
                                >
                                    {group.items.map((item) => (
                                        <li className="accordion-item" key={item.id}>
                                            <Link
                                                href={`#${item.id}`}
                                                className={`accordion-title ${
                                                    openItems[group.id] === item.id
                                                        ? ""
                                                        : "collapsed"
                                                }`}
                                                aria-expanded={
                                                    openItems[group.id] === item.id
                                                }
                                                aria-controls={item.id}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    toggleItem(group.id, item.id);
                                                }}
                                            >
                                                <div className="heading">
                                                    <div className="title text-capitalize text-title text_primary-color fw-6">
                                                        {item.question}
                                                    </div>
                                                    <span className="icon icon-CaretDown"></span>
                                                </div>
                                            </Link>
                                            <div
                                                id={item.id}
                                                className={`collapse ${
                                                    openItems[group.id] === item.id
                                                        ? "show"
                                                        : ""
                                                }`}
                                            >
                                                <div className="accordion-faqs-content">
                                                    {item.answer.map(
                                                        (paragraph, i) => (
                                                            <p
                                                                className={
                                                                    i === 0
                                                                        ? "mb_12"
                                                                        : ""
                                                                }
                                                                key={paragraph}
                                                            >
                                                                {paragraph}
                                                            </p>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar-faq sticky-top">
                            <form
                                className="form-faq"
                                action={submitFAQQuestion}
                            >
                                <div className="heading">
                                    <h5 className="mb_8">
                                        Haz tu pregunta
                                    </h5>
                                    <p>
                                        Pregunta lo que necesites. Estamos para
                                        ayudarte.
                                    </p>
                                </div>
                                <fieldset>
                                    <label
                                        htmlFor="name"
                                        className="text-button text_primary-color fw-7 mb_8"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        className=""
                                        id="name"
                                        type="text"
                                        placeholder="Tu nombre"
                                        name="name"
                                        tabIndex={2}
                                        aria-required="true"
                                        required
                                    />
                                </fieldset>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        ¿Cómo podemos ayudarte?
                                    </div>
                                    <input
                                        name="helpType"
                                        type="hidden"
                                        value={helpType}
                                    />
                                    <DropdownSelect2
                                        defaultOption={helpOptions[0]}
                                        options={helpOptions}
                                        onChange={setHelpType}
                                    />
                                </div>
                                <fieldset>
                                    <label
                                        htmlFor="comment"
                                        className="text-button text_primary-color fw-7 mb_8"
                                    >
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="comment"
                                        className=""
                                        name="message"
                                        rows={4}
                                        placeholder="Escribe tu mensaje"
                                        tabIndex={2}
                                        aria-required="true"
                                        required
                                    ></textarea>
                                </fieldset>
                                <button
                                    className="tf-btn btn-bg-1 btn-px-28 w-full"
                                    type="submit"
                                >
                                    <span>Enviar solicitud</span>
                                    <span className="bg-effect"></span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
