import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;
  const product = await Product.findById(id);
  if (!product) return Response.json({ message: "Not found" }, { status: 404 });

  product.inStock = !product.inStock;
  await product.save();

  return Response.json({
    message: `Product ${product.inStock ? "Enabled" : "Disabled"}`,
    status: product.inStock,
  });
}
