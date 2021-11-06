import { useEffect, useState } from "react";
import Layout from "../containers/layout";
import { origin } from "../config/config";
import Link from "next/link";
import ReservationBox from "../components/reservation_box";

export default function Reservations() {
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
      <Layout componentName="Feedback">
        <Link href="/">Feedback</Link>

        <div>
          <button onClick={() => handleClick("left")}>Back</button>
          <button onClick={() => handleClick("right")}>Forward</button>
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
      </Layout>
    );

  return (
    <Layout componentName="Reservations">
      <Link href="/">Feedback</Link>

      <div>
        <button onClick={() => handleClick("left")}>Back</button>
        <button onClick={() => handleClick("right")}>Forward</button>
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
    </Layout>
  );
}
