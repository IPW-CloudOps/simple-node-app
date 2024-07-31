import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const Bookmark = sequelize.define("Bookmark", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  updatedAt: false,
  freezeTableName: true,
  tableName: "bookmark"
});


export default Bookmark;