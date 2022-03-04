import useAuth from "../../lib/useAuth";

export default function ReservationBox({
  id,
  fullName,
  selectedDate,
  timeSlot,
  numberOfPeople,
  handleClick,
}) {
  const { data } = useAuth();

  return (
    <div
      style={{
        margin: "0.5rem 0",
        border: "3px solid #000",
        padding: "0.5rem",
      }}
    >
      <p>
        <span>
          <b>ID:</b> {id}
        </span>{" "}
        <span>{fullName}</span>{" "}
        <span>
          <b>Date: </b>
          {selectedDate}
        </span>{" "}
        <span>
          <b>Time Slot: </b>
          {timeSlot}
        </span>{" "}
        <span>
          <b>Num of Ppl: </b>
          {numberOfPeople}
        </span>
        {data?.user.username === "admin" && (
          <span
            style={{
              textDecoration: "underline",
              fontWeight: "bold",
              color: "red",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
            onClick={() => handleClick(id)}
          >
            Delete
          </span>
        )}
      </p>
    </div>
  );
}
