import { connectDB } from "@/lib/db";
import orderModel from "@/models/Order";
import User from "@/models/User";
import productModel from "@/models/Product";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("🟡 CREATE ORDER BODY:", body);

    const { customerId, products, shippingAddress } = body;

    // Validate customer exists or not
    const customerExists = await User.findById(customerId);
    if (!customerExists) {
      return Response.json({ message: "Invalid customer ID" });
    }

    if (!products || products.length === 0) {
      return Response.json({
        message: "Order must contain at least one product",
      });
    }

    let orderItems = [];
    let totalAmount = 0;

    // Validate products & calculate totals
    for (const item of products) {
      const dbProduct = await productModel.findById(item.product);

      if (!dbProduct) {
        return Response.json({
          message: `Invalid product ID: ${item.product}`,
        });
      }

      if (!dbProduct.inStock) {
        return Response.json({
          message: `${dbProduct.title} is currently unavailable`,
        });
      }

      const subtotal =
        Number(dbProduct.price.replace(/\D/g, "")) * item.quantity;

      totalAmount += subtotal;

      orderItems.push({
        product: dbProduct._id,
        title: dbProduct.title,
        images: dbProduct.images,
        category: dbProduct.category,
        subcategory: dbProduct.subcategory,
        price: Number(dbProduct.price.replace(/\D/g, "")),
        quantity: item.quantity,
        subtotal: String(subtotal),
      });
    }

    // Create order document

    const newOrder = new orderModel({
      customerId: new mongoose.Types.ObjectId(customerId),
      takenBy: null,
      products: orderItems,
      shippingAddress,
      totalAmount,
      isTaken: false,
    });

    await newOrder.save();

    const savedOrder = await orderModel
      .findById(newOrder._id)
      .populate("products.product", "title images");

    return Response.json(
      { message: "Order placed successfully", order: savedOrder },
      { status: 201 },
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
