import React, { useState } from 'react'
import BottomNav from '../component/BottomNav'
import OrderCard from '../component/Order/OrderCard'
import BackButton from '../component/BackButton'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getOrder } from '../https/index'
import { enqueueSnackbar } from 'notistack'

const Order = () => {
  const [status, setStatus] = useState('All');

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrder()
    },
    placeholderData: keepPreviousData
  })

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }

  return (
    <section className='bg-[#b7efc5] text-[#1a7431] h-[calc(100vh-5rem)] overflow-x-hidden scrollbar-hide'>
      <div className='flex items-center justify-between px-10 py-4 mt-2'>

        <div className='flex items-center gap-4'>
          <BackButton />
          <h1 className='text-[#1a7431] text-2xl font-bold tracking-wider'>orders</h1>
        </div>

        <div className='flex items-center justify-around gap-4'>
          <button 
          onClick={() => {
            setStatus("All")
          }} className={`text-[#1a7431] text-lg
           ${status === "All" && 'bg-[#6ede7f] rounded-lg px-5 py-2'} font-semibold`}>
            All
          </button>

          <button 
          onClick={() => {
            setStatus("In Progress")
          }} className={`text-[#1a7431] text-lg
           ${status === "In Progress" && 'bg-[#6ede7f] rounded-lg px-5 py-2'} font-semibold`}>In Progress</button>

          <button onClick={() => {
            setStatus("Ready")
          }} className={`text-[#1a7431] text-lg
           ${status === "Ready" && 'bg-[#6ede7f] rounded-lg px-5 py-2'} font-semibold`}>Ready</button>

          <button onClick={() => {
            setStatus("Completed")
          }} className={`text-[#1a7431] text-lg
           ${status === "Completed" && 'bg-[#6ede7f] rounded-lg px-5 py-2'} font-semibold`}>Completed</button>
        </div>
      </div>

      <div className='flex flex-wrap gap-6 items-center justify-center px-10 py-4 
      overflow-x-scroll scrollbar-hide'>
        {
          resData?.data.data.length > 0 ? (
            resData.data.data
              // .filter(order => {
              //   // Only today's orders
              //   const today = new Date();
              //   const orderDate = new Date(order.orderDate);
              //   return orderDate.getFullYear() === today.getFullYear() &&
              //     orderDate.getMonth() === today.getMonth() &&
              //     orderDate.getDate() === today.getDate();
              // })
              .filter(order => status === "All" || order.orderStatus === status)
              .sort((a, b) => {
                // Optional: prioritize statuses like: In Progress > Ready > Completed
                const statusPriority = { "In Progress": 1, "Ready": 2, "Completed": 3 };
                const aPriority = statusPriority[a.orderStatus] || 4;
                const bPriority = statusPriority[b.orderStatus] || 4;

                if (aPriority !== bPriority) return aPriority - bPriority;

                // Secondary sort: latest orders first
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              .map((order) => (
                <OrderCard key={order._id} order={order} width={'450px'} />
              ))
          ) : (
            <p className="col-span-3 text-gray-100">No orders available</p>
          )
        }
      </div>

      {/* <BottomNav/> */}

    </section>
  )
}

export default Order