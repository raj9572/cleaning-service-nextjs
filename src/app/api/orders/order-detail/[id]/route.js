import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const order = await Order.findById(id)
      .populate("takenBy", "name email role")
      .populate("products.product", "title images");

    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json({ order }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
