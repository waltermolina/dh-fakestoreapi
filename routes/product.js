const express = require("express");
const router = express.Router();
const product = require("../controller/product");

router.get("/", product.getAllProducts);

router.get("/mostwanted", product.getMostWantedProducts);
router.get("/suggested", product.getSuggestedProducts);

router.get("/:id/related", product.getRelatedProducts);

//router.get("/categories", product.getProductCategories);
//router.get("/category/:category", product.getProductsInCategory);

router.get("/:id", product.getProduct);

router.post("/", product.addProduct);
router.post("/new", product.addProduct);

router.put("/:id", product.editProduct);
router.put("/:id/edit", product.editProduct);
router.patch("/:id", product.editProduct);
router.patch("/:id/edit", product.editProduct);

router.delete("/:id", product.deleteProduct);
router.delete("/:id/delete", product.deleteProduct);

module.exports = router;
