import client from "../../db/connection";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  const { rows } = await client.query(
    "SELECT username, password from users WHERE username = $1;",
    [username]
  );

  //TODO: compare hash
  if (rows.length === 0 || password !== rows[0].password) {
    const user = { isAuthenticated: false };
    return res.json({ user });
  }

  const user = { username: rows[0].username, isAuthenticated: true };
  req.session.user = user;
  await req.session.save();

  res.json({ user });
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
