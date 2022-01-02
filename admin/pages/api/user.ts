import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  isAuthenticated: boolean;
  username: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  res.json(req.session.user);
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
