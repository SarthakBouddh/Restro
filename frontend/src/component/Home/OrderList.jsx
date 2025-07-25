import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'
import { getAvatarName } from '../../pages/index';

export const OrderList = ({ key, order }) => {
    return (
        <div className='flex items-center justify-between flex-wrap gap-6 mb-3 w-full overflow-x-hidden'>

            <div className='flex flex-wrap items-center'>
                {/* Left: Button */}
                <button className='bg-[#f6b100] p-4 text-xl font-bold rounded-lg mr-5'>{getAvatarName(order.customerDetails.name)}</button>

                {/* Center: Customer Info */}
                <div className='flex flex-col items-start gap-1'>
                    <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>{order.customerDetails.name}</h1>
                    <p className='text-[#ababab] text-sm'>{order.items.length} Items</p>
                </div>
            </div>

            {/* Middle: Table No (Vertically Centered) */}
            <div className='flex items-center'>
                <h1 className='text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg px-3 py-1'>
                    Table <FaLongArrowAltRight className='text-[#ababab] ml-1 intline'/> {order.table.tableNo}
                </h1>
            </div>

            {/* Right: Status */}
            <div className='flex flex-col items-end gap-2'>
                {
                    order.orderStatus === "Ready" ? (
                        <>
                            <p className='text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg'>
                                <FaCheckDouble className='inline mr-2' />
                                {order.orderStatus}
                            </p>
                            <p className='text-[#ababab] text-sm'>
                                <FaCircle className='inline mr-2 text-green-600' />
                                Ready to Serve
                            </p>
                        </>
                    ) : (
                         <>
                            <p className='text-yellow-600 bg-[#2e4a40] px-2 py-1 rounded-lg'>
                                <FaCheckDouble className='inline mr-2' />
                                {order.orderStatus}
                            </p>
                            <p className='text-[#ababab] text-sm'>
                                <FaCircle className='inline mr-2 text-yellow-600' />
                                Preparing your order
                            </p>
                        </>
                    )
                }
            </div>

        </div>
    )
}
