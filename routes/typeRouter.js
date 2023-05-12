const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");

router.post("/", typeController.addType);
router.get("/:id", typeController.findTypeById);
router.delete("/:id", typeController.deleteTypeById);
router.post("/:id", typeController.updateType);
router.get("/", typeController.findTypes);

module.exports = router;
