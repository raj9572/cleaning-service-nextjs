import { connectDB } from "@/lib/db";
import SubCategory from "@/models/SubCategory";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { subCategoryId } = await params;

    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      return Response.json({ message: "SubCategory not found" }, { status: 404 });
    }

    subCategory.isActive = !subCategory.isActive;
    await subCategory.save();

    return Response.json(
      {
        message: `SubCategory ${subCategory.isActive ? "Enabled" : "Disabled"}`,
        isActive: subCategory.isActive,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
