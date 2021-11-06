export default function ReservationBox({
  id,
  firstName,
  lastName,
  selectedDate,
  timeSlot,
  numberOfPeople,
  handleClick,
}) {
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
        <span>
          {firstName} {lastName}
        </span>{" "}
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
        <span
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => handleClick(id)}
        >
          Delete
        </span>
      </p>
    </div>
  );
}
