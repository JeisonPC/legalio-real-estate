import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();

    cookieStore.set("legalio_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
    });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}