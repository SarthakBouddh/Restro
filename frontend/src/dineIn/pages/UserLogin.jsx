import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png'; // ✅ Adjust the path based on your folder structure
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../redux/slice/CustomerSlice';

const UserLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [guestCount, setGuestCount] = useState(0)
    const [name , setName] = useState('');
    const [phone, setPhone] = useState('');

    const incrementGuest = (e) => {
        e.preventDefault();
        setGuestCount((prev) => prev + 1);
    };

    const decrementGuest = (e) => {
        e.preventDefault();
        if (guestCount > 1) setGuestCount((prev) => prev - 1);
    };

    const handleSubmit = (e) => {
        if (!name || !phone || guestCount === 0) {
            alert("Please fill all fields before creating the order.");
            return;
        }

        dispatch(setCustomer({ name, phone, guests: guestCount }));
        navigate("/menu");
        setIsOped(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0f0f0f] px-4 sm:px-10">
            {/* Form Container */}
            <div className="w-full max-w-md rounded-lg bg-[#80ed99] text-[#ababab] p-6 sm:p-8 shadow-lg ">

                <div className='w-full flex flex-col items-center justify-center'>
                    {/* Logo */}
                    <img src={logo} alt="Restro Logo" className="w-20 h-20 mb-4 sm:mb-6" />

                    {/* Brand Name */}
                    <h1 className="text-white text-4xl sm:text-6xl font-bold mb-6">Restro</h1>

                </div>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Full Name</label>
                        <div className="flex items-center rounded-lg p-3 bg-[#c7f9cc]">
                            <input
                                type="text"
                                name="name"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="bg-transparent flex-1 text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Customer Phone</label>
                        <div className="flex items-center rounded-lg p-3 bg-[#c7f9cc]">
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter Phone No."
                                className="bg-transparent flex-1 text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Guest Count */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Guest</label>
                        <div className="flex items-center justify-between bg-[#c7f9cc] px-4 py-3 rounded-lg">
                            <button onClick={decrementGuest} className="text-yellow-500 text-2xl">&minus;</button>
                            <span className="text-white">{guestCount} person{guestCount !== 1 && 's'}</span>
                            <button onClick={incrementGuest} className="text-yellow-500 text-2xl">&#43;</button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-6 py-2 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
