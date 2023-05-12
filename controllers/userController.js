const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Token } = require("../models/models");
const sendEmail = require("../utils/sendEmail");
const { createToken, verifyToken } = require("../utils/generateJwt");

class userController {
  async findUser(req, res) {
    try {
      const bearer = req.headers.authorization;
      const accessToken = bearer.split("Bearer ")[1].trim();
      const payload = await verifyToken(accessToken);
      const user = await User.findOne({ where: { id: payload.id } });
      return res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async registration(req, res, next) {
    try {
      //validate
      const { email, password, name, lastname, surname, addres } = req.body;

      if (!email || !password || !name || !lastname || !surname || !addres) {
        console.log(req.body);
        //   return next(ApiError.badRequest("Не введен пароль или почта"));
        return res.status(409).send({ message: "Заполнены не все поля" });
      }
      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        //   return next(
        //     ApiError.badRequest("Пользователь с такой почтой уже существует")
        //   );
        return res
          .status(409)
          .send({ message: "Пользователь с такой почтой уже существует" });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ ...req.body, password: hashPassword });
      // const basket = await Basket.create({ userId: user.id });
      const token = createToken(user.id, user.email, user.password);
      const tokenBase = await Token.create({
        userId: user.id,
        token: token.toString(),
      });
      const url = `${process.env.BASE_URL}api/users/${user.id}/verify/${tokenBase.token}`;
      await sendEmail(user.email, "Подтвердите почту", url);

      return res
        .status(201)
        .send({ message: "Подтвердите почту, перейдя по ссылке в письме" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async isEmailVarified(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(400).send({ message: "Ссылка недействительна" });
      }
      const token = await Token.findOne({
        where: { userId: user.id, token: req.params.token },
      });
      if (!token) {
        return res.status(400).send({ message: "Ссылка недействительна" });
      }
      await User.update(
        {
          verified: true,
        },
        {
          where: { id: user.id },
        }
      );
      await token.destroy();
      res.status(200).send({ message: "Адрес электронной почты подтвержден" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new userController();
