const Router = require("express");
const router = new Router();
const deliveryTimeController = require("../controllers/deliveryTimeController");

router.post("/", deliveryTimeController.addDeliveryTime);
router.get("/:id", deliveryTimeController.findDeliveryTimeById);
router.delete("/:id", deliveryTimeController.deleteDeliveryTimeById);
router.post("/:id", deliveryTimeController.updateDeliveryTime);
router.get("/", deliveryTimeController.findDeliveryTimes);

module.exports = router;
