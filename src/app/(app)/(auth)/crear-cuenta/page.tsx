import CreateAccountForm from "./CreateAccountForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta | Legalio",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function CrearCuentaPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <p>El enlace no es válido o está incompleto.</p>;
  }

  return <CreateAccountForm token={token} />;
}
