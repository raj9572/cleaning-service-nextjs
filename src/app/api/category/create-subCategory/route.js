import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { title, key, category, image } = body;

    if (!title || !key || !category) {
      return Response.json(
        { message: "title, key and category are required" },
        { status: 400 },
      );
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return Response.json({ message: "Invalid categoryId" }, { status: 400 });
    }

    const subCategory = await SubCategory.create({
      title,
      key,
      category: categoryExists._id,
      image,
    });

    // ✅ push subcategory id into category.subCategory array
    await Category.findByIdAndUpdate(categoryExists._id, {
      $push: { subCategory: subCategory._id },
    });

    return Response.json(
      { message: "SubCategory created successfully", subCategory },
      { status: 201 },
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
