const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class Submissions extends Model {}

Submissions.init(
  {
    submitted_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.CHAR(8),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "submissions",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Submissions;
