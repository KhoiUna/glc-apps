import { useState } from "react";
import ReservationList from "../ReservationList/ReservationList";

export default function ReservationData({
  selectedDate,
  timeSlot,
  numberOfPeople,
}) {
  let colorObj;
  if (numberOfPeople > 0 && numberOfPeople < 8) {
    colorObj = { color: "blue", backgroundColor: "orange", cursor: "pointer" };
  } else if (numberOfPeople === 8) {
    colorObj = { color: "white", backgroundColor: "red", cursor: "pointer" };
  }

  const [showPopup, setShowPopup] = useState(false);
  const triggerPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="reservation-data" onClick={triggerPopup}>
        <p className="reservation-number" style={colorObj}>
          {numberOfPeople} / 8
        </p>
      </div>

      {showPopup && numberOfPeople > 0 && (
        <ReservationList
          closePopup={closePopup}
          selectedDate={selectedDate}
          timeSlot={timeSlot}
          numberOfPeople={numberOfPeople}
        />
      )}
    </>
  );
}
