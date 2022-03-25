import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../db/connection";
import blockMethods from "../../../../lib/blockMethods";

async function updateSubmission(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.session.user?.user.isAuthenticated) {
      res.redirect("/login");
      return res.status(403).json("Forbidden");
    }

    const { method, query } = req;
    if (!blockMethods(["PUT"], method, res)) return;

    const { action } = req.body;
    const status = action === "reject" ? "rejected" : "approved";
    const response = await client.query(
      "UPDATE submissions SET status = $1 WHERE id = $2;",
      [status, query.submissionId]
    );

    if (!response)
      return res.status(406).send("Sorry, there is something wrong");

    res.json("ok");
  } catch (err) {
    console.error("Error updating submission");
    console.error(err);
  }
}

export default withIronSessionApiRoute(updateSubmission, sessionOptions);
