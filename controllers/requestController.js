const { Request } = require("../models/models");
const { verifyToken } = require("../utils/generateJwt");

class requestController {
  //typeId
  async addRequest(req, res) {
    try {
      const bearer = req.headers.authorization;
      const accessToken = bearer.split("Bearer ")[1].trim();
      const payload = await verifyToken(accessToken);
      await Request.create({ userId: payload.id, ...req.body, statusId: 22 });
      return res.status(200).send("Запрос принят");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findRequestById(req, res) {
    try {
      const request = await Request.findOne({ where: { id: req.params.id } });
      return res.send(request);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async deleteRequestById(req, res) {
    try {
      await Request.destroy({ where: { id: req.params.id } });
      return res.status(200).send("Запрос удален");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async updateRequest(req, res) {
    try {
      // const { statusId } = req.body;
      await Request.update(
        {
          statusId: 31,
        },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).send("Запрос изменен");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  //find all by typeId
  // async findRequestByUserId(req, res) {
  //   try {
  //     const request = await Request.findAll({
  //       where: { userId: req.body.userId },
  //     });
  //     return res.send(request);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ message: "Ошибка сервера" });
  //   }
  // }
  // new
  async findRequests(req, res) {
    try {
      const bearer = req.headers.authorization;
      const accessToken = bearer.split("Bearer ")[1].trim();
      const payload = await verifyToken(accessToken);
      const request = await Request.findAll({ where: { userId: payload.id } });
      return res.send(request);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }

  // async findRequests(req, res) {
  //   try {
  //     const request = await Request.findAll();
  //     return res.send(request);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ message: "Ошибка сервера" });
  //   }
  // }

  // async findRequestByStatus(req, res) {
  //   try {
  //     const request = await Request.findAll({
  //       where: { statusId: 1 },
  //     });
  //     console.log(request);
  //     return res.send(request);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ message: "Ошибка сервера" });
  //   }
  // }
}

module.exports = new requestController();
