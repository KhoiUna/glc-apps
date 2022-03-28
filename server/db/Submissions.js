const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");
const Students = require("./Students");
const Events = require("./Events");

class Submissions extends Model {}

Submissions.init(
  {
    submitted_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.CHAR(8),
      defaultValue: "pending",
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
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

Submissions.hasMany(Events, { foreignKey: "id" });
Submissions.hasMany(Students, { foreignKey: "id" });

module.exports = Submissions;
