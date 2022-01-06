import { origin } from "../config/config";

export default class EventUtil {
  static async createEvent(createdDate: Date): Promise<boolean> {
    try {
      const res = await fetch(`${origin}/api/event`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ date: new Date(createdDate).toUTCString() }),
      });

      if (res) return true;

      return false;
    } catch (error) {
      console.error("Error creating event");
      return false;
    }
  }
}
