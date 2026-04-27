"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { sendContact } from "./sendContact";

export default function FormContact() {
  const { pending } = useFormStatus();

  return (
    <div className="row tf-spacing-1 pb-0">
      <div className="col-md-6">
        <div className="box-contact">
          <div className="heading mb_23">
            <h4 className="mb_8">¿Cómo ubicarnos?</h4>
            <p>
              Estamos aquí para ayudar con cualquier pregunta, inquietud o
              consulta—¡Contáctanos hoy!
            </p>
          </div>
          <ul className="info d-grid gap_20 mb_36">
            <li>
              <i className="icon icon-MapPin"></i>
              <div className="content">
                <div className="text-title fw-6 text_primary-color mb_4">
                  Nuestra dirección
                </div>
                <p>Calle 3 28-131, Palmira</p>
              </div>
            </li>
            <li>
              <i className="icon icon-PhoneCall"></i>
              <div className="content">
                <div className="text-title fw-6 text_primary-color mb_4">
                  Contactanos
                </div>
                <p>3046035418</p>
              </div>
            </li>
            <li>
              <i className="icon icon-Alarm"></i>
              <div className="content">
                <div className="text-title fw-6 text_primary-color mb_4">
                  Email Address:
                </div>
                <a
                  href="mailto:contacto@legalio.com.co"
                  className="link text_secondary-color text-body-default"
                >
                  contacto@legalio.com.co
                </a>
              </div>
            </li>
          </ul>
          <div>
            <h5 className="mb_12">Síguenos:</h5>
            <ul className="tf-social d-flex gap_24">
              <li>
                <a href="#" className="icon-FacebookLogo"></a>
              </li>
              <li>
                <a href="#" className="icon-XLogo"></a>
              </li>
              <li>
                <a href="#" className="icon-TiktokLogo"></a>
              </li>
              <li>
                <a href="#" className="icon-InstagramLogo"></a>
              </li>
              <li>
                <a href="#" className="icon-YoutubeLogo"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <form className="form-contact" action={sendContact}>
          <div className="heading mb_24">
            <h4 className="mb_8">Contáctanos en un email</h4>
            <p>
              ¡Nos encantaría saber de ti! Si tienes alguna pregunta dejanos en
              el espacio.
            </p>
          </div>

          <div className="wrap mb_24">
            <div className="tf-grid-layout md-col-2 mb_20">
              <fieldset>
                <label
                  htmlFor="firstName"
                  className="text-button text_primary-color fw-7 mb_8"
                >
                  Nombre
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="firstName"
                  required
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="lastName"
                  className="text-button text_primary-color fw-7 mb_8"
                >
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Ingresa tu apellido"
                  name="lastName"
                  required
                />
              </fieldset>
            </div>

            <div className="tf-grid-layout md-col-2 mb_20">
              <fieldset>
                <label
                  htmlFor="email"
                  className="text-button text_primary-color fw-7 mb_8"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                  required
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="phone"
                  className="text-button text_primary-color fw-7 mb_8"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Ingresa tu teléfono"
                  name="phone"
                />
              </fieldset>
            </div>

            <fieldset>
              <label
                htmlFor="message"
                className="text-button text_primary-color fw-7 mb_8"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Ingresa tu mensaje"
                name="message"
                required
              ></textarea>
            </fieldset>
          </div>

          <button
            className="tf-btn btn-bg-1 btn-px-28 w-full"
            type="submit"
            disabled={pending}
          >
            <span>{pending ? "Enviando..." : "Enviar Mensaje"}</span>
            <span className="bg-effect"></span>
          </button>
        </form>
      </div>
    </div>
  );
}
