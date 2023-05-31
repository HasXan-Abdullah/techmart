// import mongoose from "mongoose";
// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     category: {
//       type: mongoose.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     photo: {
//       data: Buffer,
//       contentType: String,
//     },
//     shipping: {
//       type: Boolean,
//     },
//     seller_id: {
//       type: String,
//       default: "0",
//     },

//   },
//   { timestamps: true },
//   { strict: false }
// );
// export default mongoose.model("Products", productSchema);

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

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    seller_id: {
      type: String,
      default: "0",
    },
    reviews: [reviewSchema], // Add the reviews field
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
