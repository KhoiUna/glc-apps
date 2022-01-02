import type { IronSessionOptions } from "iron-session";
import type { User } from "../pages/api/user";
import dotenv from "dotenv";
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
