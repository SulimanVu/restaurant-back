const { cartController } = require("../controllers/cart.controller");
const { Router } = require("express");

const router = Router();

router.get("/", cartController.getCart);
router.post("/", cartController.createCart);
router.delete("/:id", cartController.deleteCart);
router.patch("/add/:cartId", cartController.addFood)
router.get("/food/:cartId", cartController.getCartById)
router.patch("/one/:cartId", cartController.changeOneElem)
router.patch("/remove/:cartId", cartController.removeOneElem)

module.exports = router;