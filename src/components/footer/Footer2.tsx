import Link from 'next/link'
import React from 'react'

export default function Footer2() {
  return (
    <footer className="footer style-1">
      <div className="tf-container ">
        <div className="footer-body">
          <div className="footer-infor justify-content-between">
            <div className="item">
              <span className="d-block text_color-1 text-title mb_8">Número de Teléfono:</span>
              <h4 className="text_white">3046035418</h4>
            </div>
            <div className="item">
              <span className="d-block text_color-1 text-title mb_8">Nuestra dirección</span>
              <p className="text_white h4">Calle 3 28-131, Palmira</p>
            </div>
            <div className="item">
              <span className="d-block text_color-1 text-title mb_8">Correo Electrónico:</span>
              <Link href="mailto:contacto@legalio.com.co" className="link text_white text-body-3">contacto@legalio.com.co</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom d-flex align-items-center justify-content-between">
          <p className="text_muted-color">
            ©2025 <Link href="#" className="text_white hover-underline-link">Legalio </Link>
            Todos los derechos reservados.
          </p>
          <ul className="social d-flex gap_24">
            <li><Link href="https://www.facebook.com/LegalioColombia" className="icon-FacebookLogo"></Link></li>
            {/* <li><Link href="#" className="icon-XLogo"></Link></li> */}
            {/* <li><Link href="#" className="icon-TiktokLogo"></Link></li> */}
            <li><Link href="https://www.instagram.com/legalio_sas/" className="icon-InstagramLogo"></Link></li>
            <li><Link href="https://www.youtube.com/channel/UCpWnbhiYJH-XDX8nu88fypw" className="icon-YoutubeLogo"></Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
