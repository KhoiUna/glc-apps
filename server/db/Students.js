const sequelize = require("./connection");
const { DataTypes, Model } = require("sequelize");

class Students extends Model {}

Students.init(
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signature_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "students",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Students;
