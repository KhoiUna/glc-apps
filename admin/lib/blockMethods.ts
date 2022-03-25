import { NextApiResponse } from "next";
import { User } from "../types/types";

export default function blockMethods(
  allowedMethods: string[],
  currentMethod: string,
  res: NextApiResponse<User>
) {
  if (!allowedMethods.includes(currentMethod)) {
    res.setHeader("Allow", allowedMethods);
    res.status(405).end(`Method ${currentMethod} is not allowed`);
    return false;
  }
  return true;
}
