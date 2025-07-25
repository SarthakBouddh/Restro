import React from 'react'
import BackButton from '../component/BackButton'
import { MdRestaurantMenu } from 'react-icons/md'
import MenuContainer from '../component/Menu/MenuContainer'
import CustomerInfo from '../component/Menu/CustomerInfo'
import CartItems from '../component/Menu/CartItems'
import Bill from '../component/Menu/Bill'
import { useSelector } from 'react-redux'

const Menu = () => {
  
  const customerData = useSelector(state => state.customer);
 
  return (
    <section className='flex bg-[#b7efc5] text-[#1a7431] h-[calc(100vh-5rem)] overflow-hidden gap-3'>

      <div className='flex-[3]'>
        <div className='flex items-center justify-between px-8 py-4'>
          <div className='flex items-center gap-4'>
            <BackButton />
            <h1 className='text-[#1a7431] text-2xl font-bold tracking-wider'>Menu</h1>
          </div>

          <div className='flex items-center gap-4 cursor-pointer'>
            <MdRestaurantMenu className='h-[25px] w-[25px] text-[#1a7431] text-2x1' />
            <div className='flex flex-col items-start'>
              <h1 className='text-md text-[#1a7431] font-semibold'>{customerData.customerName || "CustomerName"}</h1>
              <p className='text-xs text-[#56b06b] font-medium'>Table: {customerData.table?.tableNo || "TableNo"}</p>
            </div>
          </div>
        </div>

        <MenuContainer />

      </div>

      {/* Right Portion */}

      <div className='flex-[1] h-[535px] mt-3 bg-[#80ed99] rounded-lg'>
         <CustomerInfo/>

        <hr className='border-[#2a2a2a] border-t-2' />

        <CartItems/>

         <hr className='border-[#2a2a2a] border-t-2 mt-5' />

        <Bill/>
      </div>
    </section>
  )
}

export default Menu