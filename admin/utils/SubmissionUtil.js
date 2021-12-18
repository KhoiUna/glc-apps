import { origin } from "../config/config";

export default class SubmissionUtil {
  static async getSubmissions() {
    try {
      const res = await (
        await fetch(`${origin}/api/event/submissions/all`)
      ).json();

      return res;
    } catch (err) {
      console.error("Error getting submissions");
    }
  }
}
