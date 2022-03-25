import client from "../../db/connection";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "./user";
import PasswordHelper from "../../lib/PasswordHelper";

async function loginRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const { username, password } = req.body;

  const { rows } = await client.query(
    "SELECT username, password from users WHERE username = $1;",
    [username]
  );

  if (
    rows.length === 0 ||
    !(await PasswordHelper.comparePassword(password, rows[0].password))
  ) {
    const user = { isAuthenticated: false, username: "" };
    return res.json({ user });
  }

  const user = { username: rows[0].username, isAuthenticated: true };
  req.session.user = { user };
  await req.session.save();

  res.json({ user });
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
