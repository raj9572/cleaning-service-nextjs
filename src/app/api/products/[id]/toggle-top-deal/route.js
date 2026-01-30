import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req, context) {
  try {
    const authResult = requireAdmin(req);
    if (authResult instanceof Response) return authResult;

    await connectDB();

    const { id } = await context.params; // ⭐ FIX
    console.log("🟡 TOGGLE ID:", id);

    const product = await Product.findById(id);
    console.log("🔴 TOGGLE PRODUCT FOUND:", product);

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    product.isTopDeal = !product.isTopDeal;
    await product.save();

    return Response.json({
      message: product.isTopDeal
        ? "Marked as Top Deal"
        : "Removed from Top Deal",
      isTopDeal: product.isTopDeal,
    });
  } catch (error) {
    console.error("❌ TOGGLE ERROR:", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
