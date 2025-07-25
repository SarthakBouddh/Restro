import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { getOrder } from '../../https/index'
import OrderCard from '../Order/OrderCard'
import { useNavigate } from 'react-router-dom'

const RecentOrder = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const { data: resData, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            return await getOrder()
        },
        placeholderData: keepPreviousData,
    })

    if (isError) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
    }

    
    const filteredOrders = resData?.data.data.filter((orders) => {
        return orders?.customerDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
        orders._id?.toLowerCase().includes(search.toLowerCase());
    })
    

    return (
        <div className='px-8 mt-4 overflow-x-hidden'>
            <div className='bg-[#b7efc5] w-full h-[450px] rounded-lg'>
                <div className='flex flex-wrap justify-between mb-2'>
                    <h1 className='text-[#1a7431] text-lg font-semibold tracking-wide'>Recent Order</h1>
                    <button onClick={() => navigate("/order")} className='text-[#025cca] text-sm font-semibold'>View All</button>
                </div>

                <div className='flex items-center gap-2 bg-[#80ed99] rounded-[15px] px-6 py-4 mx-6'>
                    <FaSearch className="text-[#1a7431]" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search order' className='bg-[#80ed99] outline-none text-[#1a7431]' />
                </div>

                <div className=' mt-4 px-6 pb-4 overflow-y-auto max-h-[300px] scrollbar-hide'>
                {
                    (search.length > 0 ? filteredOrders : resData?.data.data)?.length > 0 ? (
                        (search.length > 0 ? filteredOrders : resData.data.data).map((order) => (
                            <OrderCard key={order._id} order={order} />
                        ))
                    ) : (
                        <p className='text-sm text-center text-gray-300 mt-10'>
                            {search.length > 0 ? "No orders found." : "No recent orders available."}
                        </p>
                    )
                }
               </div>

            </div>
        </div>
    )
}

export default RecentOrder