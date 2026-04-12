"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const remember = Boolean(formData.get("remember"));

    if (!email || !password) {
        throw new Error("Correo y contraseña son obligatorios");
    }

    if (!email.includes("@")) {
        throw new Error("Correo inválido");
    }

    const res = await fetch(`${process.env.PAYLOAD_URL}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message || "Credenciales inválidas");
    }

    const cookieStore = await cookies();

    cookieStore.set("legalio_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 2,
    });

    redirect("/dashboard");
}