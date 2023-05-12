const { DeliveryDate } = require("../models/models");

class deliveryController {
  async addDeliveryDate(req, res) {
    try {
      await DeliveryDate.create({ day: req.body.day });
      return res.status(200).send("Дата добавлена");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findDeliveryDateById(req, res) {
    try {
      const deliveryDate = await DeliveryDate.findOne({
        where: { id: req.params.id },
      });
      return res.send(deliveryDate);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async deleteDeliveryDateById(req, res) {
    try {
      await DeliveryDate.destroy({ where: { id: req.params.id } });
      return res.status(200).send("Дата удалена");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async updateDeliveryDate(req, res) {
    try {
      await DeliveryDate.update(
        {
          day: req.body.day,
        },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).send("Дата обновлена");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findDeliveryDates(req, res) {
    try {
      const deliveryDates = await DeliveryDate.findAll();
      return res.send(deliveryDates);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new deliveryController();
