const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class Reservations extends Model {}

Reservations.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
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
