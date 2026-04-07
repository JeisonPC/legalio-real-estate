"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Offcanvas from "../common/Offcanvas";

export default function Header5() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                  <Link
                    href="login.html"
                    className="link text-button text_primary-color"
                  >
                    Inicio de sesión/Registro
                  </Link>
                  <Link href="#" className="tf-btn md-hide">
                    <span>Publicar Propiedad</span>
                    <span className="bg-effect"></span>
                  </Link>
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

      {/* Offcanvas menu */}
      <div className="mobile-nav-wrap">
        <Offcanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
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
                <Link href="#" className="text-need">
                  {" "}
                  Need help?
                </Link>
                <ul className="mb-info">
                  <li>
                    Call Us Now: <span className="number">+1 666 8888</span>
                  </li>
                  <li>
                    Support 24/7:{" "}
                    <Link href="#" className="link">
                      contacto@legalio.com.co
                    </Link>
                  </li>
                  <li>
                    <div className="wrap-social">
                      <p>Follow us:</p>
                      <ul className="social align-items-center d-flex gap_24">
                        <li>
                          <Link href="#" className="icon-FacebookLogo"></Link>
                        </li>
                        <li>
                          <Link href="#" className="icon-XLogo"></Link>
                        </li>
                        <li>
                          <Link href="#" className="icon-TiktokLogo"></Link>
                        </li>
                        <li>
                          <Link href="#" className="icon-InstagramLogo"></Link>
                        </li>
                        <li>
                          <Link href="#" className="icon-YoutubeLogo"></Link>
                        </li>
                      </ul>
                    </div>
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
