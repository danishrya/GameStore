import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const notification = await req.json();

  const orderId = notification.order_id;
  const transactionStatus = notification.transaction_status;

  let status = "pending";

  if (transactionStatus === "settlement") {
    status = "success";
  } else if (
    transactionStatus === "expire" ||
    transactionStatus === "cancel"
  ) {
    status = "failed";
  }

  await prisma.order.update({
    where: { orderId },
    data: { status },
  });

  return NextResponse.json({ received: true });
}