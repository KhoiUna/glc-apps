import { useEffect, useState } from "react";
import { origin } from "../../config/config";
import ReservationBox from "./reservation_box";
import Button from "@mui/material/Button";
import { buttonTheme } from "../../themes/themes";
import Typography from "@mui/material/Typography";

export default function ReservationTab({ value, index }) {
  const [isLoading, setIsLoading] = useState(false);

  const [reservations, setReservations] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  useEffect(() => {
    setIsLoading(true);

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
      .then((r) => {
        setReservations(r);
        setIsLoading(false);
      })
      .catch((err) => console.error("Error getting reservations"));
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

  const makeCsv = async () => {
    try {
      const blob = await (
        await fetch(`${origin}/api/reserve/csv?dateIndex=${dateIndex}`)
      ).blob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reservations.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading csv file");
    }
  };

  if (isLoading)
    return (
      <div
        style={{ margin: "0.5rem" }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Typography>Loading...</Typography>
      </div>
    );

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

          <Button sx={buttonTheme} variant="contained" onClick={makeCsv}>
            CSV
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
              fullName={item.full_name}
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
