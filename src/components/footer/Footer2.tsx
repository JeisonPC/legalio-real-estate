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
              <a href="#" className="link text_white text-body-3">contacto@legalio.com.co</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom d-flex align-items-center justify-content-between">
          <p className="text_muted-color">
            ©2025 <a href="#" className="text_white hover-underline-link">Legalio </a>
            All Rights Reserved.
          </p>
          <ul className="social d-flex gap_24">
            <li><a href="https://www.facebook.com/LegalioColombia" className="icon-FacebookLogo"></a></li>
            {/* <li><a href="#" className="icon-XLogo"></a></li> */}
            {/* <li><a href="#" className="icon-TiktokLogo"></a></li> */}
            <li><a href="https://www.instagram.com/legalio_sas/" className="icon-InstagramLogo"></a></li>
            <li><a href="https://www.youtube.com/channel/UCpWnbhiYJH-XDX8nu88fypw" className="icon-YoutubeLogo"></a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
