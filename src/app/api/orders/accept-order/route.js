import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const { orderId, workerId } = await req.json();

    if (!orderId || !workerId) {
      return Response.json(
        { message: "orderId and workerId are required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.isTaken) {
      return Response.json(
        { message: "Order already taken by someone" },
        { status: 400 }
      );
    }

    order.isTaken = true;
    order.takenBy = workerId;

    await order.save();

    return Response.json(
      { message: "Order accepted successfully", order },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
