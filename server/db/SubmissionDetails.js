const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class SubmissionDetails extends Model {}

SubmissionDetails.init(
  {
    submission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "submission_details",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = SubmissionDetails;
