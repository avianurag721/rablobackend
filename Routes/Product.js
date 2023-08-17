const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const {
  addproduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  featuredProducts,
  filterPrice,
  filterRating,
} = require("../Controllers/product");


// *****************************************************************************************
// ************************ protected routes can be acceseed only by admins*****************
router.post("/addproduct", auth, isAdmin, addproduct);
router.post("/deleteproduct", auth, isAdmin, deleteProduct);
router.post("/updateproduct", auth, isAdmin, updateProduct);



// *************************************************************************
// ******************************Routes accessible to everyone**************

router.get("/featuredproducts", featuredProducts);
router.get("/getallproducts", getAllProducts);
router.get("/filterprice", filterPrice);
router.get("/filterrating", filterRating);

module.exports = router;
