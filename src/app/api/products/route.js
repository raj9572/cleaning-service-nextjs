import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/auth";
export async function POST(req) {
  try {

     requireAdmin(req);

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

    const products = await Product.find().sort({ createdAt: -1 });

    return Response.json({ products }, { status: 200 });
  } catch (err) {
    
    return Response.json({ message: err.message }, { status: 500 });
  }
}
