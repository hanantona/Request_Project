const Router = require("express");
const router = new Router();
const deliveryDateController = require("../controllers/deliveryDateController");

router.post("/", deliveryDateController.addDeliveryDate);
router.get("/:id", deliveryDateController.findDeliveryDateById);
router.delete("/:id", deliveryDateController.deleteDeliveryDateById);
router.post("/:id", deliveryDateController.updateDeliveryDate);
router.get("/", deliveryDateController.findDeliveryDates);

module.exports = router;
