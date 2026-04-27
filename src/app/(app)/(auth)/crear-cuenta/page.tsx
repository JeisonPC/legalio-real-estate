import CreateAccountForm from "./CreateAccountForm";

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
