import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TopBar() {
    return (
        <div className="top-bar">
            <div className="tf-container w-lg">
                <div className="top-bar-inner">
                    <Link href={"/"} className="site-logo">
                        <Image
                            className="logo_top-bar"
                            alt="logo"
                            width={292}
                            height={48}
                            src="/assets/images/logo/logo.png"
                        />
                    </Link>
                    <div className="info">
                        <div className="item d-flex gap_12 align-items-center">
                            <div className="icon">
                                <i className="icon-PhoneCall"></i>
                            </div>
                            <div className="content">
                                <p className="text-caption-2 mb_4">
                                    Have any Question?
                                </p>
                                <span className="text-title fw-6 text_primary-color">
                                    315-666-6688
                                </span>
                            </div>
                        </div>
                        <div className="item d-flex gap_12 align-items-center">
                            <div className="icon">
                                <i className="icon-EnvelopeSimple"></i>
                            </div>
                            <div className="content">
                                <p className="text-caption-2 mb_4">Email Us:</p>
                                <span className="text-title fw-6 text_primary-color">
                                    <Link href="mailto:contacto@legalio.com.co" className="link">
                                        contacto@legalio.com.co
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className="item d-flex gap_12 align-items-center">
                            <div className="icon">
                                <i className="icon-Clock"></i>
                            </div>
                            <div className="content">
                                <p className="text-caption-2 mb_4">
                                    Working Hours
                                </p>
                                <span className="text-title fw-6 text_primary-color">
                                    Mon-Sat: 7.00-19.00
                                </span>
                            </div>
                        </div>
                        <ul className="social d-flex align-items-center gap_24 text_primary-color">
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
                </div>
            </div>
        </div>
    );
}
