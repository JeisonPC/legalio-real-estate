"use client";

import React, { useState } from "react";
import Nav from "./Nav";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Offcanvas from "../common/Offcanvas";

type Header4Props = {
    isLoggedIn: boolean;
};

export default function Header4({ isLoggedIn }: Header4Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", {
                method: "POST",
            });

            window.location.href = "/login";
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };

    return (
        <>
            <header className="header style-3 header-fixed">
                <div className="tf-container w-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-inner">
                                <Link href="/" className="site-logo">
                                    <Image
                                        className="logo_header"
                                        alt="logo"
                                        width={292}
                                        height={48}
                                        src="/assets/images/logo/logo.png"
                                    />
                                </Link>

                                <Nav />

                                <div className="header-right d-flex align-items-center gap_20">
                                    {isLoggedIn ? (
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="link text-button text_primary-color"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cerrar sesión
                                        </button>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="link text-button text_primary-color"
                                        >
                                            Inicio de sesión/Registro
                                        </Link>
                                    )}

                                    <div
                                        className="mobile-button d-xl-none"
                                        onClick={() => setIsMenuOpen(true)}
                                        aria-label="Open menu"
                                    >
                                        <div className="burger">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mobile-nav-wrap">
                <Offcanvas
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                >
                    <div className="offcanvas-header top-nav-mobile">
                        <div className="offcanvas-title">
                            <Link href="/" className="site-logo">
                                <Image
                                    src="/assets/images/logo/logo.png"
                                    alt="logo"
                                    className="main-logo"
                                    width={193}
                                    height={44}
                                />
                            </Link>
                        </div>

                        <div
                            className="btn-close-menu"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="icon-times-solid"></i>
                        </div>
                    </div>

                    <div className="offcanvas-body inner-mobile-nav">
                        <div className="mb-body">
                            <MobileMenu />

                            <div className="support">
                                <Link href="#" className="tf-btn ">
                                    <span>Publicar Propiedad</span>
                                    <span className="bg-effect"></span>
                                </Link>

                                {isLoggedIn ? (
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="text-need"
                                        style={{
                                            background: "none",
                                            border: "none",
                                            padding: 0,
                                            cursor: "pointer",
                                        }}
                                    >
                                        Cerrar sesión
                                    </button>
                                ) : (
                                    <Link href="/login" className="text-need">
                                        Inicio de sesión
                                    </Link>
                                )}

                                <ul className="mb-info">
                                    <li>
                                        Call Us Now:{" "}
                                        <span className="number">
                                            +1 666 8888
                                        </span>
                                    </li>
                                    <li>
                                        Support 24/7:{" "}
                                        <Link href="#" className="link">
                                            contacto@legalio.com.co
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Offcanvas>
            </div>
        </>
    );
}