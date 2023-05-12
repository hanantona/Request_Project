const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  addres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const Token = sequelize.define("token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Token);
Token.belongsTo(User);

const Status = sequelize.define("status", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Type = sequelize.define("type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const TypeInfo = sequelize.define("type_info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Type.hasMany(TypeInfo);
TypeInfo.belongsTo(Type);

const DeliveryTime = sequelize.define("delivery_time", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  timeInterval: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const DeliveryDate = sequelize.define("delivery_date", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  day: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
  },
});

const Request = sequelize.define("request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

User.hasMany(Request);
Request.belongsTo(User);

Type.hasMany(Request);
Request.belongsTo(Type);

TypeInfo.hasMany(Request);
Request.belongsTo(TypeInfo);

Status.hasMany(Request);
Request.belongsTo(Status);

DeliveryDate.hasMany(Request);
Request.belongsTo(DeliveryDate);

DeliveryTime.hasMany(Request);
Request.belongsTo(DeliveryTime);

module.exports = {
  User,
  Token,
  Status,
  Type,
  DeliveryTime,
  DeliveryDate,
  TypeInfo,
  Request,
};
