import express from "express";
import { isAdmin, requireSignin } from "./../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductBySellerIdController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  submitReview,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import orderModel from "../models/orderModel.js";

const router = express.Router();

//routes

//create product
router.post(
  "/create-product",
  requireSignin,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

//get all products
router.get("/get-product", getProductController);

//get product by seller_id
router.get("/get-product-by/:seller_id", getProductBySellerIdController)
//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignin, braintreePaymentController);

//submit review
router.post("/submit-review/:orderId", requireSignin, submitReview);

export default router;
