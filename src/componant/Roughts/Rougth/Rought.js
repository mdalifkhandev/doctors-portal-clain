import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home ";
import Login from "../../Pages/Login/Login/Login";
import Appointnment from "../../Pages/Appointnment/Appointnment/Appointnment";
import Signup from "../../Pages/Login/signup/Signup";
import Privaterought from "../Privaterought/Privaterought";
import Account from "../../Myminycomponent/Primarybutton/mymycomp/Account/Account/Account";
import Forgatepassword from "../../Pages/Login/Login/forgatepasssword/Forgatepassword";
import Dasbotdlayout from "../../Pages/Dasbord/Dasbordlayout/Dasbotdlayout";
import Myappointment from "../../Pages/Dasbord/myappointnment/Myappointment";
import Allusers from "../../Pages/Dasbord/Allusers/Allusers";
import Adimneroughe from "../Privaterought/Adimneroughe";
import Adddoctor from "../../Pages/Dasbord/Doctor/Adddoctor/Adddoctor";
import Managedoctors from "../../Pages/Dasbord/Doctor/managedoctors/Managedoctors";
import Payment from "../../Pages/Dasbord/payment/Payment/Payment";
import Displayerror from "../../Pages/share/errorpage/Displayerror";

const roughter = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<Displayerror></Displayerror>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
      {
        path: "/appointnment",
        element: <Privaterought><Appointnment></Appointnment></Privaterought>,
      },
      {
        path:'/account',
        element:<Privaterought><Account></Account></Privaterought>
      }
    ],
  },
  {
    path:'/dasbord',
    element:<Privaterought><Dasbotdlayout></Dasbotdlayout></Privaterought>,
    errorElement:<Displayerror></Displayerror>,
    children:[
      {
        path:'/dasbord',
        element:<Myappointment></Myappointment>
      },
      {
        path:'/dasbord/allusers',
        element:<Adimneroughe><Allusers></Allusers></Adimneroughe>
      },
      {
        path:'/dasbord/adddoctor',
        element:<Adimneroughe><Adddoctor></Adddoctor></Adimneroughe>
      },
      {
        path:'/dasbord/managedoctors',
        element:<Adimneroughe><Managedoctors></Managedoctors></Adimneroughe>
      },
      {
        path:'/dasbord/payment/:id',
        element:<Payment></Payment>,
        loader:({params})=> fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/bookings/${params.id}`)
      },
    ]
  },{
    path:'/forgatepassword',
    element:<Privaterought><Forgatepassword></Forgatepassword></Privaterought>
  }
]);

export default roughter;
