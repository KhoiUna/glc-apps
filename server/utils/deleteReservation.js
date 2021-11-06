const Reservations = require("../db/Reservations");

module.exports = async (id) => {
  try {
    const res = await Reservations.destroy({
      where: {
        id,
      },
    });
    return res;
  } catch (e) {
    console.error("Error deleting data");
    console.error(e);
  }
};
