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
      <h1>payment {data.tretnmentname} </h1>
      <h1>payment {data.pasenname} </h1>
      <h1>payment {data.appointmentdate} </h1>
      <h1>payment {data.email} </h1>
      <h1>payment {data.price} </h1>
      <h1>payment {data.phone} </h1>
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
