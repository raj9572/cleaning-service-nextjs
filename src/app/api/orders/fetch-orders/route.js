import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("takenBy", "name email role")
      .populate("products.product", "title images")
      .sort({ createdAt: -1 });

    return Response.json({ orders }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
