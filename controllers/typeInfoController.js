const { TypeInfo } = require("../models/models");

class typeInfoController {
  //typeId
  async addTypeInfo(req, res) {
    try {
      await TypeInfo.create({ name: req.body.name, typeId: req.body.typeId });
      return res.status(200).send("Инофрмация типа добавлена добавлен");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async findTypeInfoById(req, res) {
    try {
      const typeInfo = await TypeInfo.findAll({
        where: { typeId: req.params.id },
      });
      return res.send(typeInfo);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async deleteTypeInfoById(req, res) {
    try {
      await TypeInfo.destroy({ where: { id: req.params.id } });
      return res.status(200).send("Информация типа удалена");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  async updateTypeInfo(req, res) {
    try {
      await TypeInfo.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).send("Информация типа обновлена");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
  //find all by typeId
  async findTypeInfoByTypeId(req, res) {
    try {
      const typeInfo = await TypeInfo.findAll({
        where: { typeId: req.body.typeId },
      });
      return res.send(typeInfo);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new typeInfoController();
