import { origin } from "../config/config";

export default class SubmissionUtil {
  static async submitForm({ submitObject }) {
    try {
      const res = await fetch(`${origin}/api/event/submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitObject),
      });

      if (res.ok === true) return true;

      return false;
    } catch (err) {
      console.error("Error submitting form");
      return;
    }
  }

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
