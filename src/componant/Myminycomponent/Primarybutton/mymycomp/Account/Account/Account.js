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
    <div>
      <h1>{user.email}</h1>

      <li>
        <button onClick={handlelogout} className="btn btn-primary">
          Sign out
        </button>
      </li>
      {user?.emailVerified ? (
        <li>
          <button className="btn btn-disabled text-green-600">
            Your Email Verifide
          </button>
        </li>
      ) : (
        <li>
          <button onClick={emailverifacation} className="btn btn-primary">
            Email Verifecation
          </button>
        </li>
      )}

      <button onClick={deletedeuser} className="btn btn-warning">
        {" "}
        Deleted user
      </button>
    </div>
  );
};

export default Account;
