import React from "react";
import appointnment from "../../../../assets/images/appointment.png";
import Primarybutton from "../../../../Myminycomponent/Primarybutton/Primarybutton";

const Contactus = () => {
  return (
    <section
      className="text-center my-10 p-10"
      style={{
        background: `url(${appointnment})`,
      }}
    >
      <h5 className="text-xl text-primary font-bold ">Contact US: </h5>
      <h1 className="text-4xl text-white">Stay connected with us</h1>
      <div className="hero mt-6">
       <div>
       
        <input type="email" name="Email" placeholder="Email address" id="" className="input  w-full max-w-xs mt-2" />
        <br /><br />
        <input type="text" placeholder="Type here" className="input  w-full max-w-xs " />
        <br /><br />
        <textarea className="textarea textarea-bordered w-full" placeholder="Comment"></textarea>
        
       <Primarybutton className='mt-10'>submit
</Primarybutton>
        </div>
       </div>
        
      
    </section>
  );
};

export default Contactus;
