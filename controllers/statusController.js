const { Status } = require("../models/models");

class statusController {
  async addStatus(req, res) {
    try {
      await Status.create({ name: req.body.name });
      return res.status(200).send("Новый статус добавлен");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findStatusById(req, res) {
    try {
      const status = await Status.findOne({ where: { id: req.params.id } });
      return res.send(status);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async deleteStatusById(req, res) {
    try {
      await Status.destroy({ where: { id: req.params.id } });
      return res.status(200).send("Статус удален");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async updateStatus(req, res) {
    try {
      await Status.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).send("Статус обновлен");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findStatuses(req, res) {
    try {
      const statuses = await Status.findAll();
      return res.send(statuses);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new statusController();
