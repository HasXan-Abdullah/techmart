import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import braintree from "braintree";

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "bdrny26q5rhwsw68",
  publicKey: "qdknqxgnj5y7k2yd",
  privateKey: "ab25797bfd8e4a90a6c518bf0bf635c2",
});

//create product controller
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, shipping, seller_id } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Product name is required." });
      case !description:
        return res
          .status(500)
          .send({ error: "Product description is required." });
      case !price:
        return res.status(500).send({ error: "Product pricec is required." });
      case !category:
        return res.status(500).send({ error: "Product category is required." });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Product photo is required and should be 1MB." });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error with creating a new product",
    });
  }
};

//get products by seller ID controller
export const getProductBySellerIdController = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const products = await productModel.find({ seller_id }).populate("category");
    res.status(200).send({
      success: true,
      message: "Products by Seller ID",
      countTotal: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with getting products by seller ID",
      error: error.message,
    });
  }
};

//update product controller
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, shipping } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Product name is required." });
      case !description:
        return res
          .status(500)
          .send({ error: "Product description is required." });
      case !price:
        return res.status(500).send({ error: "Product pricec is required." });
      case !category:
        return res.status(500).send({ error: "Product category is required." });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Product photo is required and should be 1MB." });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error with updating product",
    });
  }
};

//get all product controller
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      countTotal: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error with getting all products",
      error: error.message,
    });
  }
};

//get single product controller
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error with getting a single product",
        error,
      });
  }
};

//get photo controller
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error with getting photo of product",
        error,
      });
  }
};

//delete product controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error with deleting product",
        error,
      });
  }
};

//filter product controller
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error with filtering products",
    });
  }
};

//product count controller
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

//product list per page
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in per page list",
      error,
      success: false,
    });
  }
};

//search controller
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          {
            name: { $regex: keyword, $options: "i" },
          },
          {
            name: { $regex: keyword, $options: "i" },
          },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error with searching a product",
      error,
    });
  }
};

//related product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// product category controller
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

//payment gateway api
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};


//submit review
export const submitReview = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userName,userId, productId, rating, comment } = req.body;

    const order = await orderModel.findById(orderId);
console.log(order)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    console.log(productId)
//.find((prod) => prod.toString() === productId);
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = {
      productId,
      userName,
      userId,
      rating,
      comment,
    };

    product.reviews.push(review);
    order.reviews.push(review);

    await order.save();
    await product.save();

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};
