import React, { useState } from "react";
import Appointnmentbanner from "../Appointnmentbanner/Appointnmentbanner";
import AvailabailAppointnment from "../AvailabailAppointnment/AvailabailAppointnment/AvailabailAppointnment";
import useTitle from "../../../Myminycomponent/hokes/usetoken/useTitle";

const Appointnment = () => {
  useTitle('Appointnment')
  const [selecteddate, setSelecteddate] = useState(new Date());
  return (
    <div>
      <Appointnmentbanner
        selecteddate={selecteddate}
        setSelecteddate={setSelecteddate}
      ></Appointnmentbanner>
      <AvailabailAppointnment
        selecteddate={selecteddate}
        setSelecteddate={setSelecteddate}
      ></AvailabailAppointnment>
    </div>
  );
};

export default Appointnment;
