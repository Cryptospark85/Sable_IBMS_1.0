import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Ruan de Jongh",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "ruan.dejongh19@gmail.com" }],
      template_uuid: "0dbdac7d-2705-4fea-bbb3-fbd1aaa04c7b",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Sable Solutions",
        company_info_address: "69 Wanker Street",
        company_info_city: "Cape Town",
        company_info_zip_code: "420",
        company_info_country: "South Africa",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}