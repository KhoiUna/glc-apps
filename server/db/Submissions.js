const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");
const Students = require("./Students");
const SubmissionDetails = require("./SubmissionDetails");
const Events = require("./Events");

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
      defaultValue: "pending",
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
Submissions.hasMany(SubmissionDetails, { foreignKey: "submission_id" });

module.exports = Submissions;
