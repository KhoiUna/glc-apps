import client from "../../db/connection";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import PasswordHelper from "../../lib/PasswordHelper";
import blockMethods from "../../lib/blockMethods";
import { User } from "../../types/types";

async function loginRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  try {
    const { method } = req;

    if (!blockMethods(["POST"], method, res)) return;

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
  } catch (err) {
    console.error("Error logging in");
    console.error(err);
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
