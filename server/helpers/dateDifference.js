module.exports = (date1, date2 = new Date()) => {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);

  return Math.abs(
    Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    )
  );
};
