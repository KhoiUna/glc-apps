import { useEffect, useState } from "react";
import { origin } from "../../config/config";

export default function ReservationList({
  selectedDate,
  timeSlot,
  numberOfPeople,
  closePopup,
}) {
  const [reservationList, setReservationList] = useState([]);
  useEffect(() => {
    let res = (async () =>
      await fetch(
        `${origin}/api/calendar/reservations-list?selectedDate=${selectedDate}&timeSlot=${timeSlot}`
      ))();
    res
      .then((r) => r.json())
      .then((r) => {
        setReservationList(r);
      });
  }, [selectedDate, timeSlot]);

  return (
    <>
      <div className="ReservationList-layer" onClick={closePopup}>
        <div
          className="ReservationList"
          style={{ borderColor: numberOfPeople === 8 ? "red" : "orange" }}
        >
          <h2 className="title">RESERVATIONS LIST</h2>

          {numberOfPeople === 8 && (
            <h3
              style={{ marginBottom: "1%", color: "red", fontSize: "1.6rem" }}
            >
              * THIS SLOT IS FULL
            </h3>
          )}

          <div className="reservations">
            <table>
              <thead>
                <tr>
                  <th>
                    <h3>Name</h3>
                  </th>
                  <th>
                    <h3>Number of people</h3>
                  </th>
                </tr>
              </thead>

              <tbody>
                {reservationList.length !== 0 ? (
                  reservationList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="reservation-time">
                          <p>{item.full_name}</p>
                        </th>
                        <th key={index}>
                          <p>{item.number_of_people || 8}</p>
                        </th>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      <h3 style={{ padding: "1%" }}>Loading...</h3>
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
