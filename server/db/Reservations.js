const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class Reservations extends Model {}

Reservations.init(
  {
    first_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    number_of_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    selected_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "reservations",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Reservations;
