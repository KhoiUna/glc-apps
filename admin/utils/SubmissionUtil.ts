import { origin } from "../config/config";

export default class SubmissionUtil {
  static async getSubmissions({ queryDate }: { queryDate: string }) {
    try {
      const date = new Date(queryDate).toUTCString();
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

  static async fetchPendingSubmissionsCount(): Promise<number> {
    try {
      const count = await (await fetch("/api/events/submissions/count")).json();
      return count;
    } catch (err) {
      console.error("Error fetching pending submissions count -util");
    }
  }

  static async fetchPendingSubmissionsDates(): Promise<
    Array<{ created_at: string }>
  > {
    try {
      const dates = await (
        await fetch("/api/events/submissions/pendingDates")
      ).json();
      return dates;
    } catch (err) {
      console.error("Error fetching pending submissions dates -util");
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
        await fetch(`/api/events/submissions/${id}`, {
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
