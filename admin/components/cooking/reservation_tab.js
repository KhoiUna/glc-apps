import { useEffect, useState } from "react";
import { origin } from "../../config/config";
import ReservationBox from "./reservation_box";
import Button from "@mui/material/Button";
import { buttonTheme } from "../../themes/themes";

export default function ReservationTab({ value, index }) {
  const [reservations, setReservations] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await (
          await fetch(`${origin}/api/reserve?dateIndex=${dateIndex}`)
        ).json();
        return res;
      } catch (err) {
        console.error("Error fetching reservations");
      }
    };

    fetchReservations()
      .then((r) => setReservations(r))
      .catch((err) => console.error(err));
  }, [dateIndex]);

  const handleClick = (direction) => {
    if (direction === "left") return setDateIndex((prev) => prev - 1);
    return setDateIndex((prev) => prev + 1);
  };

  const deleteReservation = async (id) => {
    try {
      const confirmed = confirm("Are you sure?");
      if (!confirmed) return;

      const res = await fetch(`${origin}/api/reserve`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservationId: id }),
      });

      if (res.ok === true)
        return setReservations((prev) => prev.filter((item) => item.id !== id));

      return;
    } catch (error) {
      console.error("Error deleting reservation");
      return;
    }
  };

  if (reservations.length === 0)
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <div>
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => handleClick("left")}
          >
            Back
          </Button>
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => handleClick("right")}
          >
            Forward
          </Button>
        </div>

        <div style={{ margin: "1rem" }}>
          <p>
            <b>Date:</b>{" "}
            {new Date(
              new Date(Date.now() + 10 ** 8 * dateIndex).toDateString()
            ).toLocaleDateString()}
          </p>

          <p style={{ margin: "0.5rem 0" }}>
            <b>No reservations!</b>
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <div>
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => handleClick("left")}
          >
            Back
          </Button>
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => handleClick("right")}
          >
            Forward
          </Button>
        </div>

        <div style={{ margin: "1rem" }}>
          <p>
            <b>Date:</b>{" "}
            {new Date(
              new Date(Date.now() + 10 ** 8 * dateIndex).toDateString()
            ).toLocaleDateString()}
          </p>

          {reservations.map((item) => (
            <ReservationBox
              key={item.id}
              id={item.id}
              firstName={item.first_name}
              lastName={item.last_name}
              selectedDate={item.selected_date}
              timeSlot={item.time_slot}
              numberOfPeople={item.number_of_people}
              handleClick={deleteReservation}
            />
          ))}
        </div>
      </div>
    </>
  );
}
