import React from 'react'
import love from '../../../assets/images/download.jpg'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import useTitle from '../../../Myminycomponent/hokes/usetoken/useTitle';

export default function About() {
    useTitle('About')
    return (
        <div>
            <div className='grid items-center justify-center'>
                <h1>This is doctors protal servis</h1>
                <img alt='' className="mask mask-heart" src={love} />

            </div>
            <div className='grid gap-4'>
                <h1 className='text-3xl font-bold '>Contact  Us</h1>
                <Link target='_blank' className='link-primary  text-5xl' to='https://www.facebook.com/mdalifkhan2021'>
                    <FaFacebook />
                </Link>
                <Link target='_blank' className='link-primary text-5xl ' to='https://www.linkedin.com/in/alif-khan-5a81ba22a/'>
                    <FaLinkedin />
                </Link>
                <h1>Email : mdalifk2002@gmail.com</h1>
            </div>
        </div>
    )
}
