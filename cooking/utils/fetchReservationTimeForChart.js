import { origin } from "../config/config";
import FormatTime from "../helpers/FormatTime";

export default async function fetchReservationTimeForChart() {
  try {
    const res = await (await fetch(`${origin}/api/time`)).json();

    //Format response to an array for Google Charts
    const temp = [];
    res.forEach((item) => {
      if (!temp[new Date(item.selected_date).getDay()]) {
        temp[new Date(item.selected_date).getDay()] = {
          [Number(item.time_slot)]: Number(item.number_of_people),
        };
        return;
      }
      if (
        !temp[new Date(item.selected_date).getDay()][Number(item.time_slot)]
      ) {
        temp[new Date(item.selected_date).getDay()][Number(item.time_slot)] =
          Number(item.number_of_people);
        return;
      }
      temp[new Date(item.selected_date).getDay()][Number(item.time_slot)] +=
        Number(item.number_of_people);
    });

    const timeData = [];
    temp.forEach((item, index) => {
      for (let i of Object.keys(item)) {
        timeData.push([
          "",
          {
            v: index + 1 === 7 ? 0 : index + 1,
            f: FormatTime.getDayOfWeek(index + 1),
          },
          {
            v: Number(i),
            f: FormatTime.timeSlot(Number(i)),
          },
          Number(temp[index][i]),
        ]);
      }
    });
    timeData.unshift([
      "ID",
      "Day of the week",
      "Time slot",
      "# of Reservations",
    ]);

    return timeData;
  } catch (err) {
    console.error(err);
    return;
  }
}
