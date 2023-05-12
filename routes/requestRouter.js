const Router = require("express");
const router = new Router();
const requestController = require("../controllers/requestController");
const authenticatedMiddleware = require("../models/middleware/authmiddleware");

router.post("/", authenticatedMiddleware, requestController.addRequest);
router.get("/:id", requestController.findRequestById);
router.delete("/:id", requestController.deleteRequestById);
router.post("/:id", requestController.updateRequest);
router.get("/", authenticatedMiddleware, requestController.findRequests);
// router.get("/status", requestController.findRequestByStatus);
// router.get("/byuser/", requestController.findRequestByUserId);

module.exports = router;
