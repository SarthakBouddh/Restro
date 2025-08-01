import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../https/index'
import { useMutation } from '@tanstack/react-query';

const Register = (setIsRegister) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData({
      ...formData,
      role: role
    })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
    navigate("/login");
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData), // ✅ Correct: returns axios promise
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        role: ""
      })

      setTimeout(()=>{
         setIsRegister(false);
      } , 1500);
    },
    onError: (error) => {
      const { response } = error;
      enqueueSnackbar(response?.data?.message || "Login failed", {
        variant: "error",
      });
    },
  });


  return (
    <div className='w-full flex items-center justify-center px-10 overflow-x-scroll scrollbar-hide'>
      <div className="w-full rounded-lg bg-[#1f1f1f] text-[#ababab]">
        <form onSubmit={handleSubmit}>
          {/* Employee Name */}
          <div>
            <label className="block m-2 text-sm font-medium">Employee Name</label>
            <div className="flex items-center rounded-lg p-3 bg-[#353535]">
              <input
                type="text"
                name="name"
                autoComplete='name'
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter employee name"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block m-2 text-sm font-medium">Employee Email</label>
            <div className="flex items-center rounded-lg p-4 bg-[#353535]">
              <input
                type="email"
                name="email"
                autoComplete='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter employee email"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block m-2 text-sm font-medium">Employee Phone</label>
            <div className="flex items-center rounded-lg p-4 bg-[#353535]">
              <input
                type="tel"
                name="phone"
                autoComplete='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block m-2 text-sm font-medium">Password</label>
            <div className="flex items-center rounded-lg p-4 bg-[#353535]">
              <input
                type="password"
                name="password"
                autoComplete='password'
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Role Buttons */}
          <div>
            <label className="block m-2 text-sm font-medium">Choose Your Role</label>
            <div className="flex items-center gap-3 mt-2">
              {["Waiter", "Cashier", "Admin"].map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => {
                    handleRoleSelect(role)
                  }}
                  className={`p-3 w-full rounded-lg text-[#ababab] ${selectedRole === role
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'bg-[#353535] hover:bg-[#131313]'
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-2 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
