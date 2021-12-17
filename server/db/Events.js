const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class Events extends Model {}

Events.init(
  {
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.CHAR(6),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "events",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Events;
