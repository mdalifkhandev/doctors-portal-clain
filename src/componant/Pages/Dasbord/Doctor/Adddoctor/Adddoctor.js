import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Loding from "../../../../Myminycomponent/loding/Loding";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Adddoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate=useNavigate()
  const imageapikey = process.env.REACT_APP_imageapikey;
  // console.log(imageapikey);

  const { data: specialty = [], isLoading } = useQuery({
    queryKey: ["/specialty"],
    queryFn: async () => {

      const res = await fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/appointnmenspecialty`);

      const data = await res.json();
      return data;
    },
  });
  // console.log(specialty);
  const hendeldoctoradd = (data) => {
    // console.log(data.img[0]);
    const img = data.img[0];
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageapikey}`;
    // console.log(formData, img);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        if (imgdata.success) {
          const doctorsdata = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: imgdata.data.url,
          };
          // console.log(doctorsdata);

          fetch("https://doctors-portal-server-kohl-gamma.vercel.app/doctors", {

            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctorsdata),
          })
            .then((res) => res.json())
            .then((result) => {
              // console.log(result);
              toast.success(`${data.name} is added successfully`);
              navigate("/dasbord/managedoctors");
            });
        }
      });
  };

  

  if (isLoading) {
    return <Loding></Loding>;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold ml-12 mt-9">Add a new doctors</h1>
      <form
        onSubmit={handleSubmit(hendeldoctoradd)}
        className="max-w-md ml-10 mt-8 shadow-2xl p-10 rounded-2xl"
      >
        <br />
        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Name</span>{" "}
          </label>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
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
            {...register("email", {
              required: "E-mail is required",
            })}
            type="email"
            className="input input-bordered w-full "
          />
          {errors.email && (
            <p className="text-red-600">{errors.email?.message}</p>
          )}
        </div>
        <br />
        <div className="form-control w-full ">
          <select
            {...register("specialty", {
              required: "Specialty is required",
            })}
            className="select select-bordered w-full max-w-xs"
          >
            {specialty.map((sp) => (
              <option key={sp._id} value={sp.name}>
                {sp.name}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <p className="text-red-600">{errors.specialty?.message}</p>
          )}
        </div>
        <br />
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            {...register("img", {
              required: "Photo is required",
            })}
            type="file"
            className="input input-bordered w-full "
          />
          {errors.img && <p className="text-red-600">{errors.img?.message}</p>}
        </div>
        <br />
        <input
          type="submit"
          value="submit"
          className="btn btn-primary w-full"
        />
      </form>
    </div>
  );
};

export default Adddoctor;
