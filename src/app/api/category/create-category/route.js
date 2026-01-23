import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { title, key, image } = body;

    if (!title) {
      return Response.json({ message: "title is required" }, { status: 400 });
    }

    const category = await Category.create({
      title,
      key,
      image,
    });

    return Response.json(
      { message: "Category created successfully", category },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
