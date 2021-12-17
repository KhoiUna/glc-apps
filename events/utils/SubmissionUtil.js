import { origin } from "../config/config";

export default class SubmissionUtil {
  static async uploadImage({ imagePath }) {
    try {
      const res = await fetch(`${origin}/api/event/uploadImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath }),
      });

      if (res.ok === true) return true;

      return false;
    } catch (err) {
      console.error("Error uploading image");
      return;
    }
  }
}
