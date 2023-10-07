import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../contex/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../../Myminycomponent/hokes/usetoken/useToken";
import useTitle from "../../../Myminycomponent/hokes/usetoken/useTitle";

const Signup = () => {
  useTitle('Signup')
  const { createuseremailpass, updateuser } = useContext(AuthContex);
  const [signuperror, setsignuperror] = useState();
  const navigate = useNavigate();
  const { register,  formState: { errors },  handleSubmit,  } = useForm();
  const [createduseremail,setcreateduseremail]=useState('')
  const [token]=useToken(createduseremail)
  
  
  if(token){
    navigate('/')
  }
  
  // const [createdUserEmail, setCreatedUserEmail] = useState('')
  // const [token] = useToken(createdUserEmail);

  const hendelsignup = (data) => {
    console.log(data);
    toast.success('User created successfully')
    setsignuperror("");
    createuseremailpass(data.email, data.password)
      .then((resualt) => {
        console.log(resualt);
        const userinfo = {
          displayName: data.name,
        };
        updateuser(userinfo)
        .then(() => {
          saveuser(data.name,data.email,data.password)
       })
      .catch(err => console.log(err));
      })
      .catch((error) => {
        console.log(error.message);
        setsignuperror(error.message);
      });
  };

const saveuser=(name,email,password)=>{
  const user={name,email,password}
  fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/users`,{
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
        .then(data =>{
            setcreateduseremail(email)
            toast.success('user successfully created')
            console.log(data);
        })
}


// const gettoken = email=>{
//   fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/jwt?email=${email}`)
//   .then(res=>res.json())
//   .then(data=>{
//     if(data.accessToken){
//       localStorage.setItem('accessToken',data.accessToken)
//       toast.success('Access token set successfully')
//       navigate('/')
//     }
//   })
// }


  return (
    <div className="flex justify-center items-center h-[800px]">
      <div className="w-96 p-7 shadow-xl rounded-2xl">
        <h1 className="text-4xl font-bold text-center">Sign Up </h1>
        <form onSubmit={handleSubmit(hendelsignup)}>
          <br />
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full "
            />
            {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="input input-bordered w-full "
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is requires",
                minLength: { value: 8, message: "Password mast be 8 carecter" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@])/,
                  message: "Password mast be strong ,@,A-Z,a-z,0-9",
                },
                // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
              })}
              className="input input-bordered w-full "
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>

          <br />
          {signuperror && <p className="text-red-600">{signuperror}</p>}
          <br />
          <input
            type="submit"
            value="Sign Up"
            className="btn btn-accent w-full"
          />
          <p>
            Alraddy have an account ?{" "}
            <Link to="/login" className="text-primary">
              Please login
            </Link>{" "}
          </p>
          <div className="divider">OR</div>
        </form>
        <button className="btn w-full btn-outline ">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Signup;
