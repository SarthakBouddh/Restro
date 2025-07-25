import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"

const Greetings = () => {
  const [dateTime , setDateTime] = useState(new Date());
  const userData = useSelector(state => state.user);
  useEffect(()=>{
     const timer = setInterval(()=>{
        setDateTime(new Date())
     },1000)
     return () => clearInterval(timer);
  },[]);

  const formatDate = (date) => {
    const months = ['January' , 'Fabruary' , 'March' , 'April' , 'May' , 'June'
        ,'July' , 'August' , 'September' , 'October' , 'November' , 'December'
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')} , ${date.getFullYear()}`;
  }

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`;
  }
  return (
    <div className='flex justify-between items-center px-8 mt-5'>
        <div>
            <h1 className='text-[#1a7431] text-2x1 font-semibold
            tracking-wide'>Good Morning, {userData.name || "USER"}</h1>
            <p className='text-[#56de75] text-sm'>Give your best services for customers</p>
        </div>
        <div>
            <h1 className='text-[#1a7431] text-3x1 font-bold tracking-wide w-[130px]'>{formatTime(dateTime)}</h1>
            <p className='text-[#1a7431] text-sm'>{formatDate(dateTime)}</p>
        </div>
    </div>
  )
}

export default Greetings