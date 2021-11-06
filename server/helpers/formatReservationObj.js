module.exports = (initialDate, res) => {
  const reservations = {};

  [...new Array(24).fill(null)].map((i, index) => {
    reservations[index] = [0, 0, 0, 0, 0, 0, 0];
  });

  if (res.length === 0) return reservations;

  const getDayDiff = (initialDate, reserveDate) => {
    const timeDiff = Math.abs(reserveDate.getTime() - initialDate.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  res.map((i) => {
    const reserveDate = new Date(
      new Date(
        new Date(i.dataValues.selected_date).getTime() + 10 ** 8
      ).toLocaleDateString()
    );

    const dayDiff = getDayDiff(initialDate, reserveDate);

    reservations[i.dataValues.time_slot][dayDiff] = {
      selectedDate: i.dataValues.selected_date,
      numberOfPeople: i.dataValues.number_of_people * 1,
    };
  });

  return reservations;
};
