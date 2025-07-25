import React from 'react'

const MiniCard = ({title , icon , number , footerNum}) => {
  return (
    <div className='bg-[#80ed99] py-1 px-5 rounded-lg w-[50%]' >
       <div className='flex items-start justify-between'>
        <h1 className='text-[#1a7431] text-lg font-semibold tracking-wide'>
          {title}
        </h1>

        <button className={`${title == "Total Earning" ? "bg-[#02ca3a]" : "bg-[#f6b100]"} 
        p-3 rounded-lg text-[#1a7431] text-2x1`}>
          {icon}
        </button>
       </div>
       
       <div>
        <h1 className='text-[#1a7431] text-3xl font-bold'>
          {title === "Total Earnings" ? `₹${number}` : number}
        </h1>
        <h1 className='text-[#1a7431] text-lg mt-1'>
          <span className='text-[#02ca33]'>{footerNum} </span>
            than yesterday</h1>
       </div>
    </div>
  )
}

export default MiniCard