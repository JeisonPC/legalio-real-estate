import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    const cookieStore = await cookies();
    const token = cookieStore.get("legalio_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const headers = new Headers();
    headers.set("authorization", `JWT ${token}`);

    const { user: authUser } = await payload.auth({ headers });

    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { message: "No tienes permisos para enviar invitaciones" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "El usuario es obligatorio" },
        { status: 400 },
      );
    }

    const targetUser = await payload.findByID({
      collection: "users",
      id: userId,
    });

    if (!targetUser?.email) {
      return NextResponse.json(
        { message: "Usuario no encontrado o sin correo" },
        { status: 404 },
      );
    }

    if (targetUser.role === "admin") {
      return NextResponse.json(
        { message: "No se envían invitaciones a usuarios administradores" },
        { status: 400 },
      );
    }

    await payload.forgotPassword({
      collection: "users",
      data: {
        email: targetUser.email,
      },
      disableEmail: false,
    });

    await payload.update({
      collection: "users",
      id: targetUser.id,
      data: {
        invitationSent: true,
      },
    });

    return NextResponse.json({
      message: "Invitación enviada correctamente",
      user: {
        id: targetUser.id,
        email: targetUser.email,
        fullName: targetUser.fullName,
        role: targetUser.role,
      },
    });
  } catch (error) {
    console.error("Error enviando invitación:", error);

    return NextResponse.json(
      { message: "Error enviando la invitación" },
      { status: 500 },
    );
  }
}
