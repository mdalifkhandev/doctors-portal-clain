import React, { useContext } from "react";
import { AuthContex } from "../../../../../contex/AuthProvider";
import { toast } from "react-hot-toast";
import useTitle from "../../../../hokes/usetoken/useTitle";

const Account = () => {
  useTitle('Your Profile')
  const { user, logout, emailvaryfication, removeuser } =
    useContext(AuthContex);
  console.log(user.emailVerified);
  const handlelogout = () => {
    toast.success("User Logout successfully");
    localStorage.removeItem('accessToken')
    logout()
      .then((resualt) => {
        console.log(resualt.user.emailVerified);
      })
      .catch((error) => console.log(error));
  };

  const emailverifacation = () => {
    emailvaryfication().then((resualt) => {
      console.log(resualt.user.emailVerified);
    });
  };

  const deletedeuser = () => {
    removeuser()
      .then((resualt) => {
        console.log(resualt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex gap-10 items-center my-20">
      <h1>{user.email}</h1>

      
        <button onClick={handlelogout} className="btn btn-primary">
          Sign out
        </button>
      
      {user?.emailVerified ? (
        
          <button className="btn btn-disabled text-green-600">
            Your Email Verifide
          </button>
        
      ) : (
        
          <button onClick={emailverifacation} className="btn btn-primary">
            Email Verifecation
          </button>
        
      )}

      <button onClick={deletedeuser} className="btn btn-warning">
        {" "}
        Deleted user
      </button>
    </div>
  );
};

export default Account;
