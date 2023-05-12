const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authenticatedMiddleware = require("../models/middleware/authmiddleware");

router.post("/", userController.registration);
router.get("/profile", authenticatedMiddleware, userController.findUser);
router.get(
  "/:id/verify/:token",
  authenticatedMiddleware,
  userController.isEmailVarified
);

module.exports = router;
