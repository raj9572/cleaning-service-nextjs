import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/auth";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const authResult = requireAdmin(req);
    if (authResult instanceof Response) return authResult;

    await connectDB();

    const body = await req.json();
    const product = await Product.create(body);

    return Response.json({ message: "Created", product }, { status: 201 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();

    console.log("🟢 LIST ROUTE HIT");
    console.log("🟢 DB NAME:", mongoose.connection.name);

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const search = searchParams.get("search");

    const filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subcategory = subCategory;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    console.log("🟢 PRODUCTS COUNT:", products.length);

    return Response.json({ products }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
