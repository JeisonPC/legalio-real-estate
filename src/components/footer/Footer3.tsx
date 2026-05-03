import Image from "next/image";
import { submitFooterContact } from "@/actions/footerContactAction";
import Link from "next/link";

export default function Footer3() {
  return (
    <footer className="footer style-3">
      <div className="footer-body">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer-about footer-item">
              <Link href="/" className="footer-logo mb_24">
                <Image
                  height={48}
                  width={224}
                  src="/assets/images/logo/logo-2.png"
                  alt="logo"
                  className="main-logo"
                />
              </Link>
              <div className="mb_24">
                <p className="mb_4 text_color-1">Location:</p>
                <p className="text_white h5">Calle 3 28-131, Palmira</p>
              </div>
              <div>
                <p className="mb_4 text_color-1">Contactanos:</p>
                <Link href="mailto:hi.avitex@gmail.com" className="h5 link text_white mb_4">
                  hi.avitex@gmail.com
                </Link>
                <Link href="tel:315-666-6688" className="h5 link text_white">
                  315-666-6688
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="leave-comment style-1">
              <form
                id="leaveComment"
                className="form-leave-comment"
                action={submitFooterContact}
              >
                <div className="wrap mb_20">
                  <div className="tf-grid-layout md-col-2 mb_20">
                    <fieldset>
                      <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        name="name"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                  </div>
                  <fieldset className="mb_32">
                    <textarea
                      id="comment"
                      rows={4}
                      placeholder="Message"
                      name="message"
                      tabIndex={2}
                      aria-required="true"
                      required
                    ></textarea>
                  </fieldset>
                </div>
                <button className="tf-btn btn-bg-white btn-px-24" type="submit">
                  <span>Send Message</span>
                  <span className="bg-effect"></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom d-flex align-items-center justify-content-between">
        <p className="text_muted-color">
          ©2025{" "}
          <Link href="#" className="text_white hover-underline-link">
            Legalio.
          </Link>
          Todos los derechos reservados.
        </p>
        <ul className="social d-flex gap_24">
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
    </footer>
  );
}
