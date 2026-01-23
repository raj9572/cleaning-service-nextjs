import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { userId } = await params;

    // Here userId refers to takenBy OR customer?
    // In your schema there is no customer field,
    // so this fetch is based on takenBy.
    const orders = await Order.find({ takenBy: userId })
      .populate("takenBy", "name email role")
      .populate("products.product", "title images")
      .sort({ createdAt: -1 });

    return Response.json({ orders }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
