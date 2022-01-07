import { origin } from "../config/config";

export default class EventUtil {
  static async createEvent(createdDate: Date) {
    try {
      const res = await fetch(`${origin}/api/event`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ date: new Date(createdDate).toUTCString() }),
      });

      return res;
    } catch (error) {
      console.error("Error creating event");
      return;
    }
  }
}
