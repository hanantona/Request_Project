const { DeliveryTime } = require("../models/models");

class deliveryTimeController {
  async addDeliveryTime(req, res) {
    try {
      await DeliveryTime.create({ timeInterval: req.body.timeInterval });
      return res.status(200).send("New time added");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findDeliveryTimeById(req, res) {
    try {
      const deliveryTime = await DeliveryTime.findOne({
        where: { id: req.params.id },
      });
      return res.send(deliveryTime);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async deleteDeliveryTimeById(req, res) {
    try {
      await DeliveryTime.destroy({ where: { id: req.params.id } });
      return res.status(200).send("Интервал удален");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async updateDeliveryTime(req, res) {
    try {
      await DeliveryTime.update(
        {
          timeInterval: req.body.timeInterval,
        },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).send("Интервал обновлен");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findDeliveryTimes(req, res) {
    try {
      const deliveryTime = await DeliveryTime.findAll();
      return res.send(deliveryTime);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new deliveryTimeController();
