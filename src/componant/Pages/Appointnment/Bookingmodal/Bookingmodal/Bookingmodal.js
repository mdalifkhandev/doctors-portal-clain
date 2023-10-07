import React, { useContext } from "react";
import { format } from "date-fns";
import { AuthContex } from "../../../../contex/AuthProvider";
import toast from "react-hot-toast";

const Bookingmodal = ({ Tretnment, selecteddate, setTretnment, refetch }) => {
  const { name, slots, price } = Tretnment;
  // console.log(Tretnment);
  const date = format(selecteddate, "PP");
  const { user } = useContext(AuthContex);
  // console.log(user.email, user.displayName);

  const hendelsubmite = (event) => {
    event.preventDefault();
    const from = event.target;
    const pasenname = from.name.value;
    const phone = from.phonenumber.value;
    const email = from.email.value;
    const time = from.slot.value;
    const tretnmentname = name;
    const bookingdata = {
      appointmentdate: date,
      tretnmentname,
      time,
      pasenname,
      phone,
      email,
      price
    };

    fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/bookings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookingdata)
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          setTretnment(null);
          toast.success("Booking confirmed");
          refetch();
        } else {
          toast.error(data.message);
          setTretnment(null);
        }
      });
  };


  return (
    <>
      <input type="checkbox" id="bookingmodal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={hendelsubmite}>
            <h3 name="tretnment" className="text-lg font-bold">
              {name}
            </h3>
            <input
              type="text"
              value={date}
              name="day"
              readOnly
              className="input input-bordered mt-4 w-full"
            />
            <br />
            <br />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot) => (
                <option value={slot} key={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              required
              defaultValue={user.displayName}
              readOnly
              placeholder="Name"
              className="input input-bordered mt-4 w-full"
            />

            <input
              type="email"
              name="email"
              required
              defaultValue={user.email}
              readOnly
              placeholder="E-mail"
              className="input input-bordered mt-4 w-full"
            />
            <input
              type="number"
              name="phonenumber"
              required
              placeholder="Phone"
              className="input input-bordered mt-4 w-full"
            />
            <br />
            <br />
            <input
              className="w-full btn btn-accent"
              type="submit"
              value={`submit $ ${price}`}
            />
          </form>
          <label className="modal-backdrop" htmlFor="bookingmodal">
            Close
          </label>
        </div>
      </div>
    </>
  );
};

export default Bookingmodal;
