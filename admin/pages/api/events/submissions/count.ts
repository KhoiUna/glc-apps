import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../db/connection";

async function getPendingSubmissionsCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.session.user?.user.isAuthenticated) {
      res.redirect("/login");
      return res.status(403).json("Forbidden");
    }

    const sql = "select count(*) from submissions where status = 'pending'";
    const { rows } = await client.query(sql);

    const count = rows[0].count;
    res.json(count);
  } catch (err) {
    console.error("Error getting pending submissions count");
    console.error(err);
  }
}

export default withIronSessionApiRoute(
  getPendingSubmissionsCount,
  sessionOptions
);
