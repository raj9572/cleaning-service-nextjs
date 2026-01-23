import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find()
      .populate("subCategory")
      .sort({ createdAt: -1 });

    return Response.json({ categories }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
