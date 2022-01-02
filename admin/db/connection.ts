import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  connectionString: process.env.DB_STRING,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});
client
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database"));

export default client;
