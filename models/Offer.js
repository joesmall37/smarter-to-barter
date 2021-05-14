const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Offer extends Model {}

Offer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    requester_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    requested_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    service_request_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "service",
        key: "id",
      },
    },
    service_offer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "service",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "offer",
  }
);

module.exports = Offer;
