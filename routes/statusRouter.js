const Router = require("express");
const router = new Router();
const statusController = require("../controllers/statusController");

router.post("/", statusController.addStatus);
router.get("/:id", statusController.findStatusById);
router.delete("/:id", statusController.deleteStatusById);
router.post("/:id", statusController.updateStatus);
router.get("/", statusController.findStatuses);

module.exports = router;
