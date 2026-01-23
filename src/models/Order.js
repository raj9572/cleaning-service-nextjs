import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: String,
    images: [],
    category: String,
    subcategory: String,
    price: Number,
    quantity: {
      type: Number,
    },
    subtotal: Number,
  },
  { _id: false }
);

const shippingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    landmark: String,
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    takenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    products: {
      type: [orderProductSchema],
      required: true,
    },

    shippingAddress: {
      type: shippingSchema,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    isTaken: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ avoid OverwriteModelError in Next.js
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
