import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  user: {
    isAuthenticated: boolean;
    username: string;
  };
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  const user = req.session.user;
  res.json(user);
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
