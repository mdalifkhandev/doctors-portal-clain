import React from "react";
import useTitle from "../../../Myminycomponent/hokes/usetoken/useTitle";

const Confarmmodel = ({message,titel,data,deleteddoctors}) => {
  useTitle('Confarmmodel')
    // console.log(data,deleteddoctors);
  return (
    <div>
      <input type="checkbox" id="confarmmodal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{titel}</h3>
          <p className="py-4">{message}</p>
       <div className="flex justify-between">
       <label className="btn" htmlFor="confarmmodal">
          Close
        </label>
        <label onClick={()=> deleteddoctors(data)} className="btn btn-error" htmlFor="confarmmodal">
          Deleted
        </label>
       </div>
        </div>
      </div>
    </div>
  );
};

export default Confarmmodel;
