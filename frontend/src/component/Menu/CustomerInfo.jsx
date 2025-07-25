import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { formatDate, getAvatarName } from '../../pages';

const CustomerInfo = () => {
     const [dateTime , setDateTime] = useState(new Date()); 
     const customerData = useSelector(state => state.customer);
 
    return (
        <div className='flex items-center justify-between px-4 mt-1 mb-2'>
            <div className='flex flex-col items-start'>
                <h1 className='text-md txt-[#1a7431] font-semibold tracking-wide'>{customerData.customerName || "CustomerName"}</h1>
                <p className='text-xs text-[#05be30] font-medium mt-1'>#{customerData.orderId || "N/A"} / Dine in</p>
                <p className='text-xs text-[#05be30] font-medium mt-1'>{formatDate(dateTime) || "June 13 , 2025"}</p>
            </div>
            <button className='bg-[#05be30] p-3 text-xl font-bold rounded-full'>{getAvatarName(customerData.customerName) || 'NA'} </button>
        </div>
    )
}

export default CustomerInfo