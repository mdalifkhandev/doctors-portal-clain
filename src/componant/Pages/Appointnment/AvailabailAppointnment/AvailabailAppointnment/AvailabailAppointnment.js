import { format } from "date-fns";
import React, { useState } from "react";
import AvailabailAppointnmentoption from "./AvailabailAppointnmentoption/AvailabailAppointnmentoption";
import Bookingmodal from "../../Bookingmodal/Bookingmodal/Bookingmodal";
import { useQuery } from "@tanstack/react-query";
import Loding from "../../../../Myminycomponent/loding/Loding";
// import Loding from '../../../../Myminycomponent/Primarybutton/mymycomp/loding'

const AvailabailAppointnment = ({ selecteddate }) => {
  // const [appointdata, setappointdata] = useState([]);
  const [Tretnment, setTretnment] = useState(null);

  const date = format(selecteddate, "PP");

  const { data:appointdata = [],refetch ,isLoading} = useQuery({
    queryKey: ["appointnmentoption",date],

    queryFn:()=> fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/appointnmentoption?date=${date}`)

    .then((res) =>
      res.json()
    ),
  });
if(isLoading){
  return <Loding></Loding>
}
  
  return (
    <div className="mt-20">
      <h1 className="text-center font-bold text-primary text-xl">
        Available Services on {format(selecteddate, "PPP")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
        {appointdata.map((option) => (
          <AvailabailAppointnmentoption
            key={option._id}
            option={option}
            setTretnment={setTretnment}
          ></AvailabailAppointnmentoption>
        ))}
      </div>
      {Tretnment && (
        <Bookingmodal
          setTretnment={setTretnment}
          Tretnment={Tretnment}
          selecteddate={selecteddate}
          refetch={refetch}
        ></Bookingmodal>
      )}
    </div>
  );
};

export default AvailabailAppointnment;
