import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import crypto from "crypto";
import { cookies } from "next/headers";
import { getUserDisplayName } from "@/helpers/helpers";

const splitFullName = (fullName?: string | null) => {
  const parts = fullName?.trim().split(/\s+/).filter(Boolean) || [];
  const [name, ...lastnameParts] = parts;

  return {
    name: name || undefined,
    lastname: lastnameParts.join(" ") || undefined,
  };
};

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    const cookieStore = await cookies();
    const token = cookieStore.get("legalio_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const headers = new Headers();
    headers.set("authorization", `JWT ${token}`);

    const { user: authUser } = await payload.auth({ headers });

    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { message: "No tienes permisos para invitar usuarios" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const { email, fullName, name, lastname, role = "tenant" } = body;

    if (!email) {
      return NextResponse.json(
        { message: "El correo es obligatorio" },
        { status: 400 }
      );
    }

    const existingUser = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    });

    let invitedUser = existingUser.docs[0];

    if (!invitedUser) {
      const temporaryPassword = crypto.randomBytes(32).toString("hex");
      const fallbackNameParts = splitFullName(fullName);

      invitedUser = await payload.create({
        collection: "users",
        data: {
          email,
          password: temporaryPassword,
          name: name || fallbackNameParts.name,
          lastname: lastname || fallbackNameParts.lastname,
          role,
        },
      });
    }

    await payload.forgotPassword({
      collection: "users",
      data: {
        email,
      },
      disableEmail: false,
    });

    return NextResponse.json({
      message: "Invitación enviada correctamente",
      user: {
        id: invitedUser.id,
        email: invitedUser.email,
        fullName: getUserDisplayName(invitedUser, ""),
        role: invitedUser.role,
      },
    });
  } catch (error) {
    console.error("Error invitando usuario:", error);

    return NextResponse.json(
      { message: "Error enviando la invitación" },
      { status: 500 }
    );
  }
}
