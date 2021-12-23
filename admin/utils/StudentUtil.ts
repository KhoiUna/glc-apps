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
        await fetch(`${origin}/api/student/${studentId}`)
      ).json();

      return res;
    } catch (err) {
      console.error(`Error getting student approved submissioni details -util`);
      return;
    }
  }
}
