import { origin } from "../config/config";

export default class SubmissionUtil {
  static async getSubmissions({ dateIndex }: { dateIndex: number }) {
    try {
      const d = new Date();
      const date = new Date(
        new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() +
          24 * 60 * 60 * 1000 * dateIndex
      ).toUTCString();
      const sqlLikeDate = date.slice(0, 16);

      const res = await (
        await fetch(`${origin}/api/event/submissions?date=${sqlLikeDate}`)
      ).json();

      return res;
    } catch (err) {
      console.error("Error getting submissions");
      return;
    }
  }

  static async updateSubmission({
    id,
    action,
    student_id,
  }: {
    action: "approve" | "reject";
    id: number;
    student_id: number;
  }) {
    try {
      const res = await (
        await fetch(`${origin}/api/event/submission/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action, student_id }),
        })
      ).text();

      return res;
    } catch (err) {
      console.error(`Error ${action} submission -util`);
      console.error(err);
      return;
    }
  }
}