import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Products",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "deliverd", "cancel"],
    },
    reviews: [reviewSchema], // Add the reviews field
  },
  { timestamps: true },
  { strict: false }
);

export default mongoose.model("Order", orderSchema);
