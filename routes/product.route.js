const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.post("/create", productController.create);
router.get("/readAll", productController.readAll);
router.post("/read", productController.read);
router.post("/update", productController.update);
router.post("/delete", productController.delete);

module.exports = router;
