const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Token } = require("../models/models");
const sendEmail = require("../utils/sendEmail");
const { createToken } = require("../utils/generateJwt");
const crypto = require("crypto");
//const Joi = require("joi");

class authController {
  async login(req, res, next) {
    try {
      //validate
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .send({ message: "Пользователь с таким логином не найден" });
      }
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Введен неверный пароль" });
      }
      if (!user.verified) {
        let token = await Token.findOne({ where: { userId: user.id } });
        if (!token) {
          token = await Token.create({
            userId: user.id,
            token: crypto.randomBytes(32).toString("hex"),
          });
          const url = `${process.env.BASE_URL}api/users/${user.id}/verify/${token.token}`;
          await sendEmail(user.email, "Подтвердите почту", url);
        }
        return res
          .status(400)
          .send({ message: "Подтвердите почту, перейдя по ссылке в письме" });
      }
      const token = createToken(user.id, user.email, user.role);
      return res.status(200).send({
        message: "Вы вошли в профиль",
        token: { token },
        user: { user },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new authController();
