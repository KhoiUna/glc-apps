import { origin } from "../config/config";

export default class StudentUtil {
  static async fetchAllStudents() {
    try {
      const res = await (await fetch(`${origin}/api/student/all`)).json();
      return res;
    } catch (err) {
      console.error("Error getting students");
      return;
    }
  }

  static async fetchSubmissionDetails({ studentId }: { studentId: number }) {
    try {
      const res = await (
        await fetch(`${origin}/api/student/all/${studentId}`)
      ).json();

      return res;
    } catch (err) {
      console.error(`Error getting student submissions details -util`);
      return;
    }
  }
}
