import type { IronSessionOptions } from "iron-session";
import dotenv from "dotenv";
import { User } from "../types/types";
dotenv.config();

export const sessionOptions: IronSessionOptions = {
  cookieName: "auth",
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

//Specify the typings of req.session
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
