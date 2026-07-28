import NotFoundPage from "@/components/common/NotFoundPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | Legalio",
  description:
    "La página que buscas no está disponible. Encuentra propiedades, arriendos, ventas o contacta a Legalio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundPage />;
}
