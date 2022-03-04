import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../db/connection";

async function getPendingSubmissionsDates(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.session.user?.user.isAuthenticated) {
      res.redirect("/login");
      return res.status(403).json("Forbidden");
    }

    const sql =
      "select distinct created_at from submissions join events on event_id = events.id where submissions.status='pending';";
    const { rows } = await client.query(sql);

    const dates = rows
      .map(({ created_at }) => new Date(created_at).toLocaleDateString())
      .sort();
    res.json(dates);
  } catch (err) {
    console.error("Error getting pending submissions dates");
  }
}

export default withIronSessionApiRoute(
  getPendingSubmissionsDates,
  sessionOptions
);
