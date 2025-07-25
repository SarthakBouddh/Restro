import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FaHome } from 'react-icons/fa'
import { MdOutlineReorder, MdTableBar } from 'react-icons/md'
import { CiCircleMore } from 'react-icons/ci'
import { BiSolidDish } from 'react-icons/bi'
import { useNavigate, useLocation } from 'react-router-dom'
import Model from './Model'
import { setCustomer } from '../redux/slice/CustomerSlice'; // ✅ adjust path as per your project structure

const BottomNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOped] = useState(false)
  const [guestCount, setGuestCount] = useState(0)
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (location.pathname === "/") setActive("home");
    else if (location.pathname === "/order") setActive("order");
    else if (location.pathname === "/table") setActive("tables");
    // Add more routes if needed
  }, [location.pathname]);

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handleCreateOrder = () => {
  if (!name || !phone || guestCount === 0) {
    alert("Please fill all fields before creating the order.");
    return;
  }
  dispatch(setCustomer({ name, phone, guests: guestCount }));
  navigate("/table");
  setIsOped(false);
};


  const openModel = () => setIsOped(true)
  const closeModel = () => {
    setIsOped(false)
    setGuestCount(0) // reset guest count when modal closes
  }

  const incrementGuest = () => setGuestCount(prev => prev + 1)
  const decrementGuest = () => setGuestCount(prev => (prev > 0 ? prev - 1 : 0))

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#80ed99] p-1 h-14 flex justify-around'>
      <button onClick={() => {
        setActive("home")
        navigate("/")
      }} className={`flex items-center justify-center text-[#1a7431] ${active == "home" ? 'bg-[#48cf5c]' : ''} w-[200px] rounded-[20px]`}>
        <FaHome className='inline mr-4' size={20} />
        <p>Home</p>
      </button>

      <button onClick={() => {
        setActive("order");
        navigate("/order")
      }} className={`flex items-center justify-center text-[#1a7431] ${active == "order" ? 'bg-[#48cf5c]' : ''} w-[200px] rounded-[20px]`}>
        <MdOutlineReorder className='inline mr-4' size={20} />
        <p>Order</p>
      </button>

      <button onClick={() => {
        setActive("tables")
        navigate("/table")
      }} className={`flex items-center justify-center text-[#1a7431] ${active == "tables" ? 'bg-[#48cf5c]' : ''} w-[200px] rounded-[20px]`}>
        <MdTableBar className='inline mr-4' size={20} />
        <p>Tables</p>
      </button>

      <button onClick={() => {
        setActive("more")
      }} className={`flex items-center justify-center text-[#1a7431] ${active == "more" ? 'bg-[#48cf5c]' : ''} w-[200px] rounded-[20px]`}>
        <CiCircleMore className='inline mr-4' size={20} />
        <p>More</p>
      </button>

      {!["tables", "menu"].includes(active) && (
        <button
          onClick={openModel}
          className='absolute bottom-6 bg-[#29bf12] text-[#1a7431] rounded-full p-4 items-center cursor-pointer'
        >
          <BiSolidDish size={'20px'} />
        </button>
      )}

      {isOpen && (
        <Model isOpen={isOpen} onClose={closeModel} title="Create Order">
          <div className='space-y-4'>
            <div>
              <label className='block text-[#1a7431] mb-2 text-sm font-medium'>Customer Name</label>
              <div className='flex items-center rounded-lg p-3 px-4 bg-[#c7f9cc]'>
                <input
                  type="text"
                  placeholder='Enter Customer Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='bg-transparent flex-1 text-[#6ede7f] focus:outline-none'
                />
              </div>
            </div>

            <div>
              <label className='block text-[#1a7431] mb-2 text-sm font-medium'>Customer Phone</label>
              <div className='flex items-center rounded-lg p-3 px-4 bg-[#c7f9cc]'>
                <input
                  type="number"
                  placeholder='Enter Customer Phone No.'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='bg-transparent flex-1 text-[#6ede7f] focus:outline-none'
                />
              </div>
            </div>

            <div>
              <label className='block mb-2 mt-3 text-sm font-medium text-[#1a7431]'>Guest</label>
              <div className='flex items-center justify-between bg-[#c7f9cc] px-4 py-3 rounded-lg'>
                <button onClick={decrementGuest} className='text-yellow-500 text-2xl'>&minus;</button>
                <span className='text-[#6ede7f]'>{guestCount} person{guestCount !== 1 && 's'}</span>
                <button onClick={incrementGuest} className='text-yellow-500 text-2xl'>&#43;</button>
              </div>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className='w-full bg-[#f68100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700'
          >
            Create Order
          </button>

        </Model>
      )}
    </div>
  )
}

export default BottomNav
