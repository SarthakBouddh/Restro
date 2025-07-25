import React from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={()=>{
        navigate(-1)
    }} className='bg-[#1a7431] p-3 text-xl font-bold rounded-full text-white'>
        <IoIosArrowBack/>
    </button>
  )
}

export default BackButton