const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class Feedback extends Model {}

Feedback.init(
  {
    subject: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    submitted_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "feedback",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Feedback;
