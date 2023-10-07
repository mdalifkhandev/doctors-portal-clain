import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Cheakoutfrom from "../Cheakout/Cheakoutfrom";
import Loding from '../../../../Myminycomponent/loding/Loding'
import useTitle from "../../../../Myminycomponent/hokes/usetoken/useTitle";

// const stripePromise = loadStripe('pk_test_51NrtkkG1p3nVEVTLlIhN9JauWDQ4WVtWQ7GTOSj5wjMyrQjjQ7NMU5KyiRYJ3HKn2xXRQU0D9RLyBbdU5LjkKmSb00fo9FLHfW');
const stripePromise = loadStripe(process.env.REACT_APP_styrip_pk);
console.log(stripePromise);

const Payment = () => {
  useTitle('Payment')
  const data = useLoaderData();
  const navigation=useNavigation()
  if(navigation.state==='loading'){
    return <Loding></Loding>
  }
  // console.log(data);
  return (
    <div className="mx-28">
      <div className="overflow-x-auto">
  <table className="table my-7">
    <tbody>
      <tr>
        <th>Tretnment Name :</th>
        <td>{data.tretnmentname}</td>
      </tr>
      <tr>
        <th>Pasenname : </th>
        <td>{data.pasenname}</td>
      </tr>
      <tr>
        <th>Appointment Date : </th>
        <td>{data.appointmentdate}</td>
      </tr>
      <tr>
        <th>E-mail :</th>
        <td>{data.email}</td>
      </tr>
      <tr>
        <th>Price :</th>
        <td>$ {data.price}</td>
      </tr>
      <tr>
        <th>Mobile Number :</th>
        <td>{data.phone}</td>
      </tr>
    </tbody>
  </table>
</div>
      {/* <h1>Tretnment Name : {data.tretnmentname} </h1>
      <h1>Pasenname : {data.pasenname} </h1>
      <h1>Appointment Date : {data.appointmentdate} </h1>
      <h1>E-mail : {data.email} </h1>
      <h1>Price : {data.price} </h1>
      <h1>Mobile Number : {data.phone} </h1> */}
      <div>
        <Elements className="w-96 my-10" stripe={stripePromise}>
          <Cheakoutfrom
          data={data}
          ></Cheakoutfrom>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
