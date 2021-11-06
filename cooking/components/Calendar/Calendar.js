import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FormatTime from "../../helpers/FormatTime";
import ReservationData from "../ReservationData/ReservationData";

export default function Calendar({
  numReservedObj,
  dateIndex,
  handleClickDate,
}) {
  return (
    <div className="Calendar">
      <table>
        <thead>
          <tr>
            <th id="left-arrow">
              {dateIndex > 0 && (
                <FontAwesomeIcon
                  className="arrow-button"
                  icon={faArrowLeft}
                  onClick={() => handleClickDate("left")}
                />
              )}
            </th>
            <th colSpan="7" id="month-year">
              <h3 style={{ paddingRight: "14%" }}>
                {FormatTime.monthYear(dateIndex)}
              </h3>
            </th>
            <th id="right-arrow">
              <FontAwesomeIcon
                className="arrow-button"
                icon={faArrowRight}
                onClick={() => handleClickDate("right")}
              />
            </th>
          </tr>
          <tr className="thead-title">
            <th style={{ textAlign: "center" }} className="reservation-time">
              <p>Time Slot</p>
            </th>
            {new Array(7).fill(null).map((item, index) => (
              <th key={index}>
                <p className="date-of-week" key={index}>
                  {FormatTime.dateOfWeek(dateIndex, index)}
                </p>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {numReservedObj
            ? [...new Array(24).fill(null)].map((item, yIndex) => (
                <tr className="reservation-rows" key={yIndex}>
                  <th className="reservation-time">
                    {FormatTime.timeSlot(yIndex)}
                  </th>
                  {numReservedObj[yIndex].map((item, index) => (
                    <th key={index}>
                      <ReservationData
                        selectedDate={item.selectedDate}
                        timeSlot={yIndex}
                        numberOfPeople={
                          item.selectedDate ? item.numberOfPeople * 1 : 0
                        }
                      />
                    </th>
                  ))}
                  <th></th>
                </tr>
              ))
            : [...Array(24).keys()].map((time, index) => (
                <tr className="reservation-rows" key={index}>
                  <th className="reservation-time">
                    {FormatTime.timeSlot(time)}
                  </th>
                  <th colSpan={7}>
                    <div className="reservation-loading">
                      <p className="reservation-number">Loading...</p>
                    </div>
                  </th>
                  <th></th>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
