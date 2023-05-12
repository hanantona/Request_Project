const Router = require("express");
const router = new Router();
const typeInfoController = require("../controllers/typeInfoController");

router.post("/", typeInfoController.addTypeInfo);
router.get("/:id", typeInfoController.findTypeInfoById);
router.delete("/:id", typeInfoController.deleteTypeInfoById);
router.post("/:id", typeInfoController.updateTypeInfo);
router.get("/", typeInfoController.findTypeInfoByTypeId);

module.exports = router;
