import { connectDB } from "@/lib/db";
import SubCategory from "@/models/SubCategory";

export async function GET(req, { params }) {
  try {
    await connectDB();

    // ✅ Next.js new versions: params is a promise
    const { categoryId } = await params;

    const subCategories = await SubCategory.find({ category: categoryId }).sort({
      createdAt: -1,
    });

    return Response.json({ subCategories }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
