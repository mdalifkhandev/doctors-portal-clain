import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../contex/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../../Myminycomponent/hokes/usetoken/useToken";
import useTitle from "../../../Myminycomponent/hokes/usetoken/useTitle";

const Login = () => {
  useTitle('Login')
  const { signin, googlelogin } = useContext(AuthContex);
  const [loginError, setLoginError] = useState("");
  const { register, formState: { errors }, handleSubmit, } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginuseremail, setloginuseremail] = useState('')
  const [token] = useToken(loginuseremail)
  console.log(token);
  const from = location?.state?.from?.pathname || "/";
  if (token) {
    navigate(from, { replace: true });
  }
  // const [data, setData] = useState("");
  const hendellogins = (data) => {
    console.log(data);
    setLoginError("");
    signin(data.email, data.password)
      .then((resualt) => {
        setloginuseremail(data.email)
        console.log(resualt.user.emailVerified);
        toast.success("User login successfully");
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const saveuser = (name, email) => {
    const user = { name, email }
    fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        setloginuseremail(email)
        toast.success('Login successfully')
        console.log(data);
      })
  }

  const googleloginpopup = () => {
    googlelogin()
      .then((resualt) => {
        toast.success('Google login successfully')
        navigate(from, { replace: true });
        const email = resualt.user.email
        const name = resualt.user.displayName
        saveuser(name, email)
        // console.log(resualt.user.displayName);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-xl rounded-2xl">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(hendellogins)}>
          <br />
          <div className="form-control w-full ">
            <label className="label">
              {" "}
              <span className="label-text">E-mail</span>{" "}
            </label>
            <input
              {...register("email", {
                required: "Email Address is required",
              })}
              type="email"
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters or longer",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@])/,
                  message: "Password mast be strong ,@,A-Z,a-z,0-9",
                },
              })}
              type="password"
              className="input input-bordered w-full "
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>

          {/* <p>{data}</p> */}
          <br />
          <Link to="/forgatepassword">Forgot password</Link>
          <br />
          {loginError && <p className="text-red-600">{loginError}</p>}
          <br />
          <input
            type="submit"
            value="Login"
            className="btn btn-accent w-full"
          />
          <p>
            New to Doctors Portal ?{" "}
            <Link to="/signup" className="text-primary">
              Create new account
            </Link>{" "}
          </p>
          <div className="divider">OR</div>
        </form>
        <button onClick={googleloginpopup} className="btn w-full btn-outline ">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
