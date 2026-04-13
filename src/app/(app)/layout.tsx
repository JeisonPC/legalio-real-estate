import { Manrope } from "next/font/google";
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
import styles from "./layout.module.css";


const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
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
            <body className={manrope.variable}>
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
