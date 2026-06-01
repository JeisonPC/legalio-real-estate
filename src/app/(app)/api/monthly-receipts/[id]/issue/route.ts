import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { issueMonthlyReceipt } from "@/lib/monthlyReceipts/issueMonthlyReceipt";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config });

    const cookieStore = await cookies();
    const token = cookieStore.get("legalio_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const headers = new Headers();
    headers.set("authorization", `JWT ${token}`);

    const { user } = await payload.auth({ headers });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "No tienes permisos para emitir recibos" },
        { status: 403 },
      );
    }

    const receipt = await issueMonthlyReceipt({
      payload,
      receiptId: id,
      generatedBy: user.id,
    });

    return NextResponse.json({
      message: "Recibo emitido y enviado correctamente",
      receipt,
    });
  } catch (error) {
    console.error("monthly receipt issue error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Error emitiendo y enviando el recibo";

    return NextResponse.json({ message }, { status: 500 });
  }
}
