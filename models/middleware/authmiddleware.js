// Import Engine Modules
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Import Utils
const { verifyToken } = require("../../utils/generateJwt");
// const ApiError = require("../../error/ApiError");

// Create Middleware Function
async function authenticatedMiddleware(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new Error(401, "Unauthorised"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();
  try {
    const payload = await verifyToken(accessToken);

    if (!payload) {
      return next(new Error(401, "Unauthorised"));
    }
    const user = await User.findOne({ where: { id: payload.id } });

    if (!user) {
      return next(new Error(401, "Unauthorised"));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new Error(401, "Unauthorised"));
  }
}

module.exports = authenticatedMiddleware;
