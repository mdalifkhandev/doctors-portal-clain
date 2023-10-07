import React from 'react';
import Banner from '../Banner/Banner';
import Maincard from '../infocard/Maincard/Maincard';
import Servisemain from '../Servicesprovider/Servicesmainpage/Servisemain';
import Tretnment from '../Tretnment/Tretnment/Tretnment';
import Appointnment from '../MakeAppointnment/Appointnment/Appointnment';
import Testimonialheader from '../Testimonial/Testimonialheader/Testimonialheader';
import Contactus from '../Contactus/Contactus/Contactus';
import useTitle from '../../../Myminycomponent/hokes/usetoken/useTitle';

const Home  = () => {
    useTitle('Doctors protal Home')
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Maincard></Maincard>
            <Servisemain></Servisemain>
            <Tretnment></Tretnment>
            <Appointnment></Appointnment>
            <Testimonialheader></Testimonialheader>
            <Contactus></Contactus>
        </div>
    );
};

export default Home ;