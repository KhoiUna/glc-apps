import { origin } from "../config/config";

export default class SubmissionUtil {
  static async getSubmissions({ dateIndex }) {
    try {
      const timeStamp = new Date().getTime();
      const date = new Date(
        timeStamp + 24 * 60 * 60 * 1000 * dateIndex
      ).toUTCString();
      const sqlLikeDate = date.slice(0, 16);
      console.log(sqlLikeDate);

      const res = await (
        await fetch(`${origin}/api/event/submissions?date=${sqlLikeDate}`)
      ).json();

      return res;
    } catch (err) {
      console.error("Error getting submissions");
      return;
    }
  }
}
