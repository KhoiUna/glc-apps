import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/types";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  const user = req.session.user;
  res.json(user);
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
