import NotFoundPage from "@/components/common/NotFoundPage";
import styles from "@/components/common/NotFoundPage.module.css";
import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";

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
  title: "Página no encontrada | Legalio",
  description:
    "La página que buscas no está disponible. Vuelve al inicio o encuentra propiedades con respaldo legal en Legalio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body
        className={`${manrope.variable} ${sourceSerif.variable} ${styles.globalBody}`}
      >
        <NotFoundPage standalone />
      </body>
    </html>
  );
}
