import React from 'react'
import logo from '../assets/logo.png'
import { FaSearch, FaBell, FaUserCircle, } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { IoLogOut } from 'react-icons/io5'
import { useMutation } from '@tanstack/react-query';
import { logout } from '../https/index';
import { removeUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import {MdDashboard} from 'react-icons/md'
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  const userData = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dark mode state
  const [darkMode, setDarkMode] = React.useState(() => {
    return document.body.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      return next;
    });
  };

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate('/auth')
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate();
  }
  return (
    <div className={`flex justify-between items-center py-4 px-8 bg-[#80ed99]`} >
      <div onClick={() => {navigate('/')}} className='flex items-center gap-2 cursor-pointer'>
        <img src={logo} alt="restro logo" className='h-8 w-8' />
        <h1 className='text-lg font-semibold text-[#1a7431]'>Restro</h1>
      </div>

      <div className='flex items-center gap-2 bg-[#c7f9cc] rounded-[15px] px-5 py-2
        w-[500px]'>
        <FaSearch className="text-[#80ed99]" />
        <input type="text" placeholder='search' className='bg-[#c7f9cc] outline-none text-[#29bf12]' />
      </div>

      <div className='flex items-center gap-4'>
        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className='bg-[#6ede7f] rounded-[15px] p-2 cursor-pointer flex items-center justify-center'
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FaSun className='h-[22px] w-[22px] text-yellow-400' /> : <FaMoon className='h-[22px] w-[22px] text-gray-700' />}
        </button>
        {
          userData.role == 'Admin' && (
            <div onClick={() => navigate("/dashboard")} className='bg-[#6ede7f] rounded-[15px] p-2 cursor-pointer'>
              <MdDashboard className='h-[25px] w-[25px] text-[#1a7431] text-2x1' />
            </div>
          )
        }
        <div className='bg-[#6ede7f] rounded-[15px] p-2 cursor-pointer'>
          <FaBell className='h-[25px] w-[25px] text-[#1a7431] text-2x1' />
        </div>
        <div className='flex items-center gap-4 cursor-pointer bg-[#6ede7f] rounded-[15px] px-4 py-1'>
          <FaUserCircle className='h-[25px] w-[25px] text-[#1a7431] text-2x1' />
          <div className='flex flex-col items-start'>
            <h1 className='text-md text-[#1a7431] font-semibold'>{userData.name || "USER"}</h1>
            <p className='text-xs text-[#29bf12] font-medium'>{userData.role || "Role"}</p>
          </div>
        </div>
        <IoLogOut onClick={handleLogout} className='cursor-pointer text-[#1a7431]' size={30} />
      </div>
    </div>
  )
}

export default Header