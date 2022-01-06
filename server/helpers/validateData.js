module.exports = ({ fullName, numberOfPeople, selectedDate, timeSlot }) =>
  isNaN(fullName.trim()) &&
  numberOfPeople > 0 &&
  numberOfPeople <= 8 &&
  new Date(selectedDate.toLocaleDateString()) >=
    new Date(new Date().toLocaleDateString()) &&
  timeSlot !== false;
