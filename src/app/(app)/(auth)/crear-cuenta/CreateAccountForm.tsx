"use client";

import { useState } from "react";

type Props = {
  token: string;
};

export default function CreateAccountForm({ token }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();

    if (password.length < 8) {
      setMessage("La contraseña debe tener mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const res = await fetch("/api/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    if (!res.ok) {
      setMessage("El enlace expiró o no es válido. Solicita uno nuevo.");
      setIsSubmitting(false);
      return;
    }

    setMessage("Tu cuenta fue creada correctamente. Ya puedes iniciar sesión.");
    setIsSubmitting(false);
  }

  return (
    <main style={{ maxWidth: 420, margin: "80px auto", padding: 24 }}>
      <h1>Crear cuenta</h1>

      <p>Define una contraseña para activar tu cuenta en Legalio.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva contraseña</label>
          <input
            type="password"
            value={password}
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            minLength={8}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}
