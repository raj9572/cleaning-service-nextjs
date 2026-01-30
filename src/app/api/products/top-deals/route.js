import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const topDeals = await Product.find({ isTopDeal: true }).sort({
      updatedAt: -1,
    });

    return Response.json({ products: topDeals }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
