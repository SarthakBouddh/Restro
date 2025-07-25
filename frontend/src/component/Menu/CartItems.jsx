import React, { useEffect, useRef } from 'react'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { FaNotesMedical } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { removeItem } from '../../redux/slice/CartSlice'

const CartItems = () => {

  const cartData = useSelector((state) => state.cart);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  } , [cartData])

  const handleRemove = (itemsId) =>{
    dispatch(removeItem(itemsId))
  }

  return (
    <div className='px-4 mt-2'>
      <h1 className='text-xl text-[#1a7431] font-semibold tracking-wide'>Order Details</h1>
      <div className='mt-4 overflow-x-scroll scrollbar-hide h-[200px]' ref={scrollRef}>
        {cartData.length === 0 ? (
          <p className='text-[#05be30] text-lg flex justify-center items-center h-[200px]'>Your Cart is Empty Start adding items!</p>
        ) : 
        cartData.map((items) => {
          return (
            <div key={items.id} className='bg-[#c7f9cc] rounded-lg px-4 py-3 mb-2'>
              <div className='flex items-center justify-between'>
                <h1 className='text-[#05be30] font-semibold tracking-wide text-md'>
                  {items.name}
                </h1>
                <p className='text-[#05be30] font-semibold'>x{items.quantity}</p>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between mt-3'>
                  <div className='flex items-center gap-3'>
                    <RiDeleteBin2Fill 
                    onClick={() =>{
                      handleRemove(items.id)
                    }}
                    className='text-[#05be30] cursor-pointer' size={20} />
                    <FaNotesMedical className='text-[#05be30] cursor-pointer' size={20} />
                  </div>
                </div>
                <p className='text-[#1a7431] text-md font-bold'>₹{items.price}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartItems