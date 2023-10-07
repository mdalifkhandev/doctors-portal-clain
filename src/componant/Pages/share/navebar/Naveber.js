import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../contex/AuthProvider";

const Naveber = () => {
  const { user } = useContext(AuthContex);

  const menuitems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/appointnment">Appointnment</Link>
      </li>
      <li>
        <Link to="/review">Review</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>

      {user?.uid ? (
        <>
          <li>
            <Link to="/dasbord">Dasboard</Link>
          </li>

          <li>
            <Link to="/account">Profile</Link>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       {menuitems}
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {menuitems}
    </ul>
  </div>
  
      {/* <label htmlFor="dasbord-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
</div>
  );
};

export default Naveber;
