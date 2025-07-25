import React from 'react'
import { FaCheckDouble, FaCircle, FaLongArrowAltRight } from 'react-icons/fa'
import { formatDateAndTime, getAvatarName } from '../../pages/index'
import {GrUpdate} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const OrderCard = ({ order, width }) => {
    const navigate = useNavigate();
    return (
        <div
            className='bg-[#6ede7f] p-4 rounded-xl mb-4 shadow-sm'
            style={{ width: `${width}px` }}
        >
            {/* Top Section */}
            <div className='flex justify-between items-start gap-4'>
                {/* Customer Info */}
                <div className='flex gap-6'>
                    <button className='bg-[#1a7431] text-white w-12 h-12 text-xl font-bold rounded-lg flex items-center justify-center'>
                        {getAvatarName(order.customerDetails.name)}
                    </button>

                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#1a7431] text-base font-semibold'>
                            {order.customerDetails.name}
                        </h2>
                        <p className='text-[#29bf12] text-sm'>
                            #{Math.floor(new Date(order.orderDate).getTime())} / Dine in
                        </p>
                        <p className='text-[#29bf12] text-sm flex items-center'>
                            Table
                            <FaLongArrowAltRight className='text-[#29bf12] ml-1 mr-1' />
                            {order?.table?.tableNo}
                        </p>
                    </div>
                </div>

                {/* Status Info */}
                <div className='flex justify-between items-start gap-4'>
                <div className='flex flex-col items-end gap-2'>
                    {order.orderStatus === "Ready" && (
                        <>
                            <p className='text-[#1a7431] bg-green-900/20 px-3 py-1 rounded-lg text-sm'>
                                <FaCheckDouble className='inline mr-1' />
                                {order.orderStatus}
                            </p>
                            <p className='text-[#29bf12] text-sm'>
                                <FaCircle className='inline mr-1 text-[#1a7431]' />
                                Ready to Serve
                            </p>
                        </>
                    )}

                    {order.orderStatus === "In Progress" && (
                        <>
                            <p className='text-yellow-500 bg-yellow-900/20 px-3 py-1 rounded-lg text-sm'>
                                <FaCheckDouble className='inline mr-1' />
                                {order.orderStatus}
                            </p>
                            <p className='text-[#29bf12] text-sm'>
                                <FaCircle className='inline mr-1 text-yellow-500' />
                                Preparing your order
                            </p>
                        </>
                    )}

                    {order.orderStatus === "Completed" && (
                        <>
                            <p className='text-teal-400 bg-teal-900/20 px-3 py-1 rounded-lg text-sm'>
                                <FaCheckDouble className='inline mr-1' />
                                {order.orderStatus}
                            </p>
                            <p className='text-[#29bf12] text-sm'>
                                <FaCircle className='inline mr-1 text-yellow-400' />
                                Preparing your order
                            </p>
                        </>
                    )}
                   </div>
                   <GrUpdate onClick={() => navigate('/dashboard?tab=Orders')} className='text-[#1a7431] inline mr-4 cursor-pointer' size={20}/>
                </div>
            </div>

            {/* Meta Info */}
            <div className='flex justify-between items-center mt-4 text-[#29bf12] text-sm'>
                <p>{formatDateAndTime(order.createAt)}</p>
                <p>{order.items.length} items</p>
            </div>

            <hr className='my-4 border-gray-600' />

            {/* Total */}
            <div className='flex justify-between items-center'>
                <h2 className='text-[#1a7431] text-base font-semibold'>Total</h2>
                <p className='text-[#1a7431] text-base font-semibold'>
                    ${order.bills.totalWithTax.toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default OrderCard
