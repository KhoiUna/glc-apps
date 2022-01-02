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
client.connect().catch((err) => console.error("err"));

export default async function loginRoute(req, res) {
  const { rows: students } = await client.query("SELECT * from students;");
  await client.end();

  res.json(students);
}
