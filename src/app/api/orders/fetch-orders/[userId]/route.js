import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import mongoose from "mongoose";
import "@/models/User";
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { userId } = await params;

    const orders = await Order.find({
      customerId: new mongoose.Types.ObjectId(userId),
    })
      .populate("takenBy", "name email role")
      .populate("products.product", "title images")
      .sort({ createdAt: -1 });

    return Response.json({ orders }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
