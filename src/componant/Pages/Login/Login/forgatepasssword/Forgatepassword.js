import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../../../contex/AuthProvider";
import useTitle from "../../../../Myminycomponent/hokes/usetoken/useTitle";

const Forgatepassword = () => {
  useTitle('Forgot password')
    const {forgatepassword}=useContext(AuthContex)
    const {
        register,
        // formState: { errors },
        handleSubmit,
      } = useForm();
  const hendelresetpassword = (data) => {
   console.log(data.email);
   forgatepassword(data.email)
    .then(resualt=>{
      console.log(resualt);
    })
    .then(error=>{
      console.log(error);
    })
  

  };
  return (
    <div className="flex justify-center items-center">
      <form onClick={handleSubmit(hendelresetpassword)}>
        <label htmlFor="">E-mail</label>
        <br />
        <br />
        <input
          className="input input-bordered"
          {...register("email", {
            required: "Email Address is required",
          })}
          placeholder="E-mail"
          type="email"
          name="email"
          id=""
        />
        <br />
        <br />
        <input className="btn btn-error" type="submit" value="Reset Password" />
      </form>
    </div>
  );
};

export default Forgatepassword;
