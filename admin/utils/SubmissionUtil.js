import { origin } from "../config/config";

export default class SubmissionUtil {
  static async getSubmissions({ dateIndex }) {
    try {
      const res = await (
        await fetch(`${origin}/api/event/submissions/${dateIndex}`)
      ).json();

      return res;
    } catch (err) {
      console.error("Error getting submissions");
    }
  }
}
