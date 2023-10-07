import React from 'react'
import Testimonialmaincard from '../../Home/Testimonial/Testimonialcard/Testimonialmaincard/Testimonialmaincard'
import quote from '../../../assets/icons/quote.svg'

export default function Review() {
  return (
    <div className='my-5'>
     <section className='mt-12'> 
            <div className='flex justify-between'>
                <div>
                    <h5 className='text-primary font-bold text-5xl my-4'>Review</h5>
                    <h2 className='text-4xl'>What Our Patients Says</h2>
                </div>
                <figure>
                    <img src={quote} className='lg:w-48 w-24' alt="" />
                </figure>
            </div>
            <div>
                <Testimonialmaincard></Testimonialmaincard>
            </div>
        </section>
    </div>
  )
}
