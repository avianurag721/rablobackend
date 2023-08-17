const mongoose = require("mongoose");
const Product = require("../models/Product");

exports.addproduct = async (req, res) => {
  try {
    const { productName, price, featured, rating, company } = req.body;
    if (!productName || !price || !rating || !company) {
      return res.status(405).json({
        success: false,
        message: "all fields are required",
      });
    }

    const newProduct = await Product.create({
      productName,
      price,
      featured,
      rating,
      company,
    });
    // console.log("new product", newProduct);
    return res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("error while adding product", error);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    console.log("all the productrs", allProducts);
    return res.status(200).json({
      success: true,
      message: "fetched all the products",
      products: allProducts,
    });
  } catch (error) {
    console.log("cant get all products", error);
    return res.status(405).json({
      success: false,
      messge: "unable to fetch products",
      error,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const updates = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(405).json({
        success: false,
        message: "Product does no exist",
      });
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          product[key] = JSON.parse(updates[key]);
        } else {
          product[key] = updates[key];
        }
      }
    }
    await product.save();

    const updatedProduct = await Product.findById(productId);
    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log("error while updating the data", error);
    return res.status(405).json({
      success: false,
      message: "error while updating the prodcut data",
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(403).json({
        success: false,
        message: "please provide product id to delete a product",
      });
    }
    const updatedData = await Product.findByIdAndDelete(
      { _id: productId },
      { new: true }
    ).exec();
    const data = await Product.find({});
    console.log("new data afeter deletion", data);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data,
    });
  } catch (error) {
    console.log("error while deleting a product", error);
    return res.status(403).json({
      success: false,
      message: "Product cant be deleted",
    });
  }
};
exports.featuredProducts = async (req, res) => {
  try {
    // const { featured } = req.body;
    const featuredData = await Product.find({ featured: true }).exec();
    return res.status(202).json({
      success: true,
      message: "featured adata fetched",
      featuredData,
    });
  } catch (error) {
    console.log("error while fetching featured products", error);
    return res.status(405).json({
      success: false,
      message: "unable to fetch featured products",
    });
  }
};
exports.filterPrice = async (req, res) => {
  try {
    const { Price } = req.body;
    const filteredProducts = await Product.find({
      price: { $lte: Price },
    });
    if (!filteredProducts) {
      return res.status(403).json({
        success: false,
        message: "Cant fetch products of this price",
      });
    }
    console.log("price filtered products");
    return res.status(200).json({
      success: true,
      message: "fetched According to Price",
      filteredProducts,
    });
  } catch (error) {
    console.log("cannt find products", error);
    return res.status(403).json({
      success: false,
      message: "Cant fetch products  on price filter",
    });
  }
};
exports.filterRating = async (req, res) => {
  try {
    const { Rating } = req.body;
    const filteredProducts = await Product.find({
      rating: { $gte: Rating },
    });

    // console.log("price filtered products");
    return res.status(200).json({
      success: true,
      message: "fetched According to Rating",
      filteredProducts,
    });
  } catch (error) {
    // console.log("cannt find products", error);/
    return res.status(403).json({
      success: false,
      message: "Cant fetch products  on price filter",
    });
  }
};
