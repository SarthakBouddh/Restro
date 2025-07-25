import React from 'react';
import restaurant from '../assets/images/restaurant-img.jpg';
import logo from '../assets/images/logo.png';
import Register from '../component/auth/Register';
import Login from '../component/auth/Login';
import { useState } from 'react';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <img
          src={restaurant}
          alt="Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Quote */}
        <blockquote className="relative z-20 h-full flex items-end p-10 text-white italic text-xl">
          <div>
            "Serve customer the best food with prompt and friendly service in a welcoming atmosphere, and they'll keep coming back."
            <br />
            <span className="block mt-4 text-yellow-400">- Founder of Restro</span>
          </div>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 min-h-screen bg-[#1f1f1f] p-2">
        {/* Login or content here */}
        <div className='flex flex-col items-center'>
          <img src={logo} alt="Restro logo"
            className='h-14 w-14 border-2 rounded-full p-1' />
          <h1 className='text-lg font-semibold text-[#f5f5f5] tracking-wide'>Restro</h1>
        </div>

        <h2 className='text-4xl text-center mt-2 font-semibold text-yellow-400 mb-2'>
          {isRegister ? 'Employee Registration' : "Employee Login"}
        </h2>

        {isRegister ? <Register setIsRegister={setIsRegister}/> : <Login />}

        <div className="flex justify-center mt-2">
          <p className="text-sm text-[#ababab]">
            {isRegister ? 'Already have an account?' : 'Don’t have an account?'}
            <a
              onClick={(e) => {
                e.preventDefault();
                setIsRegister(!isRegister)
              }}
              className="text-yellow-400 font-semibold hover:underline mx-2 cursor-pointer"
              href="#"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auth;
