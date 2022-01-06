require("dotenv").config();
const Events = require("../Events");

(async () => {
  try {
    const d = new Date();
    const currentDate = new Date(
      new Date(d.getFullYear(), d.getMonth(), d.getDate())
    ).toUTCString();

    await Events.update(
      {
        status: "opened",
      },
      {
        where: { created_at: currentDate },
      }
    );
    return process.exit();
  } catch (e) {
    console.error("Error getting single event");
    return process.exit();
  }
})();
