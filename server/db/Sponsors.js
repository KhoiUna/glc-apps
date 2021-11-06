const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class Sponsors extends Model {}

Sponsors.init(
  {
    full_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    school_email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    social_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    submitted_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "sponsors",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Sponsors;
