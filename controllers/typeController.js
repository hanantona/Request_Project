const { Type } = require("../models/models");

class typeController {
  async addType(req, res) {
    try {
      await Type.create({ name: req.body.name });
      return res.status(200).send("Новый тип добавлен");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findTypeById(req, res) {
    try {
      const type = await Type.findOne({ where: { id: req.params.id } });
      return res.send(type);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async deleteTypeById(req, res) {
    try {
      await Type.destroy({ where: { id: req.params.id } });
      return res.status(200).send("Тип удален");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async updateType(req, res) {
    try {
      await Type.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).send("Тип обновлен");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findTypes(req, res) {
    try {
      const types = await Type.findAll();
      return res.send(types);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new typeController();
