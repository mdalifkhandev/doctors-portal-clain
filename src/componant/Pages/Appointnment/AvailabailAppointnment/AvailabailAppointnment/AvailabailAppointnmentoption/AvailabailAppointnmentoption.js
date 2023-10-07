import React from "react";
import useTitle from "../../../../../Myminycomponent/hokes/usetoken/useTitle";

const AvailabailAppointnmentoption = ({ option, setTretnment }) => {
  useTitle('Appointnment')
  const { name, slots ,price} = option;
  return (
    <div>
      <div className="card shadow-2xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-secondary font-bold">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : "Try Another day"}</p>
          <p>
            {slots.length} {slots.length > 1 ? "spaces" : "space"} availabail
          </p>
          <p>
            price : $ {price}
          </p>
          <div className="card-actions">
            {/* The button to open modal */}
            <label
              onClick={() => setTretnment(option)}
              htmlFor="bookingmodal"
              disabled={slots.length === 0}
              className="btn btn-primary text-white"
            >
              Book Appointment
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabailAppointnmentoption;
