import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../https/index';
import { enqueueSnackbar } from 'notistack';
import { setUser } from '../../redux/slice/userSlice';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData), // ✅ Correct: returns axios promise
    onSuccess: (res) => {
      const { data } = res;
      const { _id, name, email, phone, role } = data.data;
      dispatch(setUser({ _id, name, email, phone, role }));
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/")
    },
    onError: (error) => {
      const { response } = error;
      enqueueSnackbar(response?.data?.message || "Login failed", {
        variant: "error",
      });
    },
  });

  return (
    <div className="w-full flex items-center justify-center px-10 mt-10 overflow-x-scroll scrollbar-hide">
      <div className="w-full rounded-lg bg-[#1f1f1f] text-[#ababab]">
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block m-2 text-sm font-medium">Employee Email</label>
            <div className="flex items-center rounded-lg p-4 bg-[#353535]">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter employee email"
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
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter password"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-2 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
