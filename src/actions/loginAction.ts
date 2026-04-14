"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
    error?: string;
};

export async function loginAction(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const remember = Boolean(formData.get("remember"));

    if (!email || !password) {
        return { error: "Correo y contraseña son obligatorios" };
    }

    if (!email.includes("@")) {
        return { error: "Correo inválido" };
    }

    try {
        const res = await fetch(`${process.env.PAYLOAD_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            cache: "no-store",
        });

        let data: any = {};
        try {
            data = await res.json();
        } catch { }

        if (!res.ok) {
            return {
                error: data?.errors?.[0]?.message || "Credenciales inválidas",
            };
        }

        const cookieStore = await cookies();

        cookieStore.set("legalio_token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 2,
        });
    } catch {
        return { error: "Ocurrió un error al iniciar sesión" };
    }

    redirect("/dashboard");
}