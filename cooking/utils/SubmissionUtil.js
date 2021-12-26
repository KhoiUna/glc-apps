import { origin } from "../config/config";

export default class SubmissionUtil {
  static async fetchStudentNames() {
    try {
      const res = await (await fetch(`${origin}/api/student`)).json();
      return res;
    } catch (err) {
      console.error("Error getting student names");
      return;
    }
  }
}
