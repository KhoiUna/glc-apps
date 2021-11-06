module.exports = {
  initialDate(index) {
    return new Date(Date.now() + 10 ** 8 * 6 * index);
  },
  timeSlot(time) {
    if (time < 12) {
      return `${time}am`;
    }
    if (time - 12 === 0) {
      return "12pm";
    }
    return `${time}pm`;
  },
  month(index) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[this.initialDate(index).getMonth()];
  },
  monthYear(index) {
    const monthYear = `${this.month(index)} ${this.initialDate(
      index
    ).getFullYear()}`;
    return monthYear;
  },
  isLeapYear(index) {
    const year = this.initialDate(index).getFullYear();
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return 29;
        } else {
          return 28;
        }
      } else {
        return 29;
      }
    } else {
      return 28;
    }
  },
  dateOfWeek(index, loopIndex) {
    const dateNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const monthObj = {
      January: 31,
      February: this.isLeapYear(index),
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };

    let nameIndex = this.initialDate(index).getDay() - 1 + loopIndex;
    if (nameIndex > 6) {
      nameIndex -= 7;
    }
    if (nameIndex < 0) {
      nameIndex += 7;
    }

    let date = this.initialDate(index).getDate() + loopIndex;
    if (date > monthObj[this.month(index)]) {
      date -= monthObj[this.month(index)];
    }

    const dateName = dateNames[nameIndex];
    return `${dateName} - ${date}`;
  },
  getDayOfWeek(dateIndex) {
    switch (dateIndex) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      case 7:
        return "Sun";
    }
  },
};
