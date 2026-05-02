"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { sendContact } from "./sendContact";
import Link from "next/link";

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
                <Link
                  href="mailto:contacto@legalio.com.co"
                  className="link text_secondary-color text-body-default"
                >
                  contacto@legalio.com.co
                </Link>
              </div>
            </li>
          </ul>
          <div>
            <h5 className="mb_12">Síguenos:</h5>
            <ul className="tf-social d-flex gap_24">
              <li>
                <Link
                  href="https://www.facebook.com/LegalioColombia/"
                  className="icon-FacebookLogo"
                ></Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/LegalioColombia"
                  className="icon-XLogo"
                ></Link>
              </li>
              <li>
                <Link
                  href="https://www.tiktok.com/@legalio_colombia"
                  className="icon-TiktokLogo"
                ></Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/legalio_colombia/"
                  className="icon-InstagramLogo"
                ></Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/@legalio_colombia"
                  className="icon-YoutubeLogo"
                ></Link>
              </li>
              <Link
                href="https://www.linkedin.com/company/legalio-abogados/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en LinkedIn"
                className="social-svg-link"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V23h-4V8z" />
                </svg>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <form className="form-contact" action={sendContact}>
          <div className="heading mb_24">
            <h4 className="mb_8">Contáctanos en un email</h4>
            <p>
              ¡Nos encantaría saber de ti! Si tienes alguna pregunta, déjanos un
              mensaje en el espacio a continuación.
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
