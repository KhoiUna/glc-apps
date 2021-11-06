module.exports = ({
  firstName,
  lastName,
  numberOfPeople,
  selectedDate,
  timeSlot,
}) =>
  firstName &&
  lastName &&
  numberOfPeople > 0 &&
  numberOfPeople <= 8 &&
  new Date(selectedDate.toLocaleDateString()) >=
    new Date(new Date().toLocaleDateString()) &&
  timeSlot !== false;
