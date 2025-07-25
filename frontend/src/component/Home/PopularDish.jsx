import React from 'react'
import { popularDishes } from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'

const PopularDish = () => {
    const navigate = useNavigate();
    return (
        <div className='h-[480px]'> {/* <- Fixed height box */}
            <div className='w-full h-full rounded-lg bg-[#c7f9cc] p-4 shadow-sm'>
                {/* Header */}
                <div className='flex flex-wrap justify-between items-center mb-3'>
                    <h1 className='text-[#1a7431] text-lg font-semibold tracking-wide'>Popular Order</h1>
                    <button onClick={() => navigate('/menu')} className='text-[#025cca] text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer'>View all</button>
                </div>

                {/* Scrollable content */}
                <div className='h-[calc(100%-48px)] overflow-y-auto pr-1 scrollbar-hide'>
                    {
                        popularDishes.map((dish) => (
                            <div key={dish.id} className='flex items-center gap-5 bg-[#80ed99] rounded-[15px] px-6 py-4 mb-2.5'>
                                <h1 className='text-[#1a7431] font-bold text-xl mr-5'>
                                    {dish.id < 10 ? `0${dish.id}` : dish.id}
                                </h1>
                                <img src={dish.image} alt={dish.name} className='w-[50px] h-[50px] rounded-full' />
                                <div>
                                    <h1 className='text-[#1a7431] font-semibold tracking-wide'>{dish.name}</h1>
                                    <p className='text-[#1a7431] text-sm font-semibold mt-1'>
                                        <span className='text-[#5da76e]'>Orders: </span>{dish.numberOfOrders}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default PopularDish