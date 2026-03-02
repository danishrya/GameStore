import { prisma } from "@/lib/prisma";
import { snap } from "@/services/midtrans";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { productId, userId } = body;

  if (!productId || !userId) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  const orderId = "ORDER-" + uuidv4();

  await prisma.order.create({
    data: {
      orderId,
      productId,
      userId,
      amount: product.price,
      status: "pending",
    },
  });

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: product.price,
    },
  });

  return NextResponse.json({
    status: "success",
    orderId,
    snapToken: transaction.token,
    redirectUrl: transaction.redirect_url,
  });
}
