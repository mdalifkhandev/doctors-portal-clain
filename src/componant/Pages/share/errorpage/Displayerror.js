import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContex } from '../../../contex/AuthProvider';
import toast from 'react-hot-toast';
import useTitle from '../../../Myminycomponent/hokes/usetoken/useTitle';

const Displayerror = () => {
    useTitle('Login or Reload')
    const {logout}=useContext(AuthContex)
    const error=useRouteError();
    const navigate=useNavigate()
    const hendellogout=()=>{
        logout()
        .then(()=>{
            navigate('/login')
        })
        .catch(error=>{
            console.log(error);
            toast.success('logout sussfully')
        })
    }
    return (
        <div>
            <h1 className='text-8xl'> Error</h1>
            <h1 className='text-8xl'>{error.statusText || error.message}</h1>
            <h1 className='text-5xl'>please <button  onClick={hendellogout} className='btn btn-lg btn-primary '>sign out</button></h1>
        </div>
    );
};

export default Displayerror;