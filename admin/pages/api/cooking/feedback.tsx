import { NextApiRequest, NextApiResponse } from "next";
import { origin } from "../../../config/config";

export default async function feedbackRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const feedback = await (await fetch(`${origin}/api/feedback`)).json();
    res.json(feedback);
  } catch (err) {
    console.error("Error fetching feedback");
    return;
  }
}
