module.exports = ({ date }) => {
  const currentDate = new Date();
  const dt2 = new Date(date);

  const dateDifference = Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )) /
      (1000 * 60 * 60 * 24)
  );

  return dateDifference >= 0;
};
