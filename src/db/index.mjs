import "@sequelize/mariadb";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
  }
);

export async function connect() {
  try {
    await sequelize.authenticate();
    console.log(`Connected to database!`);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

export default sequelize;