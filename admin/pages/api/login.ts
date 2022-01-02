import client from "../../db/connection";

export default async function loginRoute(req, res) {
  const { rows: students } = await client.query("SELECT * from students;");
  await client.end();

  res.json(students);
}
