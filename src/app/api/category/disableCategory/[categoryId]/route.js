import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { categoryId } = await params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return Response.json({ message: "Category not found" }, { status: 404 });
    }

    category.isActive = !category.isActive;
    await category.save();

    return Response.json(
      {
        message: `Category ${category.isActive ? "Enabled" : "Disabled"}`,
        isActive: category.isActive,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
