import React, { useContext } from "react";
import Naveber from "../../share/navebar/Naveber";
import { Link, Outlet } from "react-router-dom";
import { AuthContex } from "../../../contex/AuthProvider";
import useAdmin from "../../../Myminycomponent/hokes/usetoken/useAdmin";
import useTitle from "../../../Myminycomponent/hokes/usetoken/useTitle";

const Dasbotdlayout = () => {
  useTitle('Dasbord')
  const {user}=useContext(AuthContex)
  const [isAdmin]=useAdmin(user?.email)
  return (
    <div>
      <Naveber></Naveber>
      
      <div className="drawer lg:drawer-open">
        <input id="dasbord-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>
          
        </div>
        <div className="drawer-side">
          <label htmlFor="dasbord-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to='/dasbord'>Appointment</Link>
            </li>
            {
              isAdmin && <>
              <li>
              <Link to='/dasbord/allusers'>ALL Users</Link>
            </li>
              <li>
              <Link to='/dasbord/adddoctor'>Add Doctors</Link>
            </li>
              <li>
              <Link to='/dasbord/managedoctors'>Manage Doctors</Link>
            </li>
              </>
            }
          </ul>
        </div>
      </div>
      <label htmlFor="dasbord-drawer" tabIndex={0} className="btn btn-ghost lg:hidden drawer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
    </div>
  );
};

export default Dasbotdlayout;
