import { Manrope, Source_Serif_4 } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../../public/assets/icons/icomoon/style.css";
import "../../../public/assets/scss/app.scss";
import BackToTop from "@/components/common/BackToTop";
import ClientScripts from "@/components/common/ClientScripts";
import Footer1 from "@/components/footer/Footer1";
import Header4 from "@/components/header/Header4";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import styles from "./layout.module.css";


const GTM_ID = "GTM-575JDZZM";

const manrope = Manrope({
    variable: "--legalio-sans",
    subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
    variable: "--legalio-serif",
    subsets: ["latin"],
    weight: "variable",
});

export const metadata: Metadata = {
    title: "Legalio | Asesoría legal inmobiliaria en Colombia",
    description:
        "Compra, vende o arrienda con seguridad jurídica. En Legalio te acompañamos en todo el proceso inmobiliario con respaldo legal real. Evita fraudes y protege tu inversión.",
    icons: {
        icon: "/favicon.ico?v=2",
        shortcut: "/favicon.ico?v=2",
        apple: "/favicon.ico?v=2",
    },
    keywords: [
        "asesoría inmobiliaria Colombia",
        "abogados inmobiliarios",
        "contrato de arrendamiento Colombia",
        "compra de vivienda legal",
        "venta de propiedades Colombia",
        "Legalio",
        "bienes raíces seguros",
        "arrendamiento seguro",
    ],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("legalio_token")?.value;
    const isLoggedIn = Boolean(token);

    return (
        <html lang="es">
            <body className={`${manrope.variable} ${sourceSerif.variable}`}>
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                        title="Google Tag Manager"
                    />
                </noscript>
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${GTM_ID}');
                    `}
                </Script>
                <div
                    id="wrapper"
                    className={`clearfix bg-light-color ${styles["content-global"]}`}
                >
                    <Header4 isLoggedIn={isLoggedIn} />
                    <section className={styles.contentMain}>
                        {children}
                    </section>
                    <Footer1 />
                </div>
                <ClientScripts />
                <BackToTop />
            </body>
        </html>
    );
}
