"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

import config from "@/payload.config";

interface LoginState {
    error?: string;
}

export async function loginAction(
    _prevState: LoginState,
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
        const payload = await getPayload({ config });

        const { token } = await payload.login({
            collection: "users",
            data: {
                email,
                password,
            },
        });

        if (!token) {
            return { error: "No se recibió un token válido al iniciar sesión" };
        }

        const cookieStore = await cookies();

        cookieStore.set("legalio_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 2,
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        if (
            error instanceof Error &&
            ["AuthenticationError", "ValidationError"].includes(error.name)
        ) {
            return { error: "Credenciales inválidas" };
        }

        return { error: "Ocurrió un error al iniciar sesión" };
    }

    redirect("/dashboard");
}
