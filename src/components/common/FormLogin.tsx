"use client";

import Link from "next/link";
import React, { useActionState, useState } from "react";
import Image from "next/image";
import { loginAction } from "@/actions/loginAction";

const initialState = {
    error: "",
};

export default function FormLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, pending] = useActionState(loginAction, initialState);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="tf-container tf-spacing-1">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form className="form-account" action={formAction}>
                        <h3 className="text-center mb_23">Inicio de Sesión</h3>

                        {state?.error && (
                            <div className="alert alert-danger mb_20" role="alert">
                                {state.error}
                            </div>
                        )}

                        <fieldset className="mb_20">
                            <label
                                htmlFor="email"
                                className="form-label text_primary-color text-button mb_8"
                            >
                                Tu correo electrónico <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Ingresa tu correo electrónico"
                                required
                            />
                        </fieldset>

                        <label
                            htmlFor="password"
                            className="form-label text_primary-color text-button mb_8"
                        >
                            Contraseña <span className="required">*</span>
                        </label>

                        <fieldset className="mb_20 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                id="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={handleTogglePassword}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                <i
                                    className={showPassword ? "icon-eye" : "icon-eye-slash"}
                                ></i>
                            </button>
                        </fieldset>

                        <div className="d-flex align-items-center justify-content-between">
                            <fieldset className="checkbox-item style-1">
                                <label>
                                    <input type="checkbox" name="remember" />
                                    <span className="btn-checkbox"></span>
                                    <span className="text-body-default">Recuérdame</span>
                                </label>
                            </fieldset>

                            <Link
                                href="#"
                                className="hover-line-text forgot text-body-default"
                            >
                                ¿Perdiste la contraseña?
                            </Link>
                        </div>

                        <div className="or">
                            <span className="text-body-default">o regístrate con</span>
                        </div>

                        <div className="signin-with d-grid gap_9 mb_24">
                            <Link href="#" className="tf-btn btn-border w-full">
                                <span className="d-flex align-items-center gap_12">
                                    <Image
                                        width={50}
                                        height={50}
                                        src="/assets/images/logo/facebook.svg"
                                        alt="logo"
                                    />
                                    Continue With Facebook
                                </span>
                                <span className="bg-effect"></span>
                            </Link>

                            <Link href="#" className="tf-btn btn-border w-full">
                                <span className="d-flex align-items-center gap_12">
                                    <Image
                                        width={50}
                                        height={50}
                                        src="/assets/images/logo/google.svg"
                                        alt="logo"
                                    />
                                    Continue With Google
                                </span>
                                <span className="bg-effect"></span>
                            </Link>

                            <Link href="#" className="tf-btn btn-border w-full">
                                <span className="d-flex align-items-center gap_12">
                                    <Image
                                        width={50}
                                        height={50}
                                        src="/assets/images/logo/twitter.svg"
                                        alt="logo"
                                    />
                                    Continue With Twitter
                                </span>
                                <span className="bg-effect"></span>
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn-signup tf-btn btn-bg-1 w-full mb_12"
                            disabled={pending}
                        >
                            <span>{pending ? "Ingresando..." : "Login"}</span>
                            <span className="bg-effect"></span>
                        </button>

                        <p className="login-link text-center">
                            ¿No tienes cuenta?{" "}
                            <Link
                                href="/register"
                                className="hover-underline-link text_primary-color fw-6"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}