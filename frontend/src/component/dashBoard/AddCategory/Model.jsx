import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory } from '../../../https/index.js';
import { enqueueSnackbar } from 'notistack';

// List of nice background colors
const NICE_COLORS = [
  '#FFB6C1', // Light Pink
  '#FFD700', // Gold
  '#90EE90', // Light Green
  '#87CEFA', // Light Sky Blue
  '#FFA07A', // Light Salmon
  '#FF69B4', // Hot Pink
  '#20B2AA', // Light Sea Green
  '#FFA500', // Orange
  '#B0E0E6', // Powder Blue
  '#D8BFD8', // Thistle
];

function getRandomColor() {
  return NICE_COLORS[Math.floor(Math.random() * NICE_COLORS.length)];
}

const Model = ({ onClose }) => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    bgColor: getRandomColor(),
    icon: '',
  });

  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    categoryMutation.mutate(categoryData);
  };

  const categoryMutation = useMutation({
    mutationFn: (reqData) => addCategory(reqData),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      onClose();
      enqueueSnackbar('Category created successfully', { variant: 'success' });
    },
    onError: (error) => {
      const { data } = error.response || {};
      enqueueSnackbar(data?.message || 'Something went wrong', { variant: 'error' });
      console.error(error);
    },
  });

  return (
    <div className='fixed inset-0 text-[#1a7431] bg-black/40 flex items-center justify-center z-50'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='bg-[#80ed99] p-6 rounded-lg shadow-lg w-96 relative z-50'
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-[#1a7431] text-xl font-semibold'>Add Category</h2>
          <button
            onClick={onClose}
            className='text-[#1a7431] hover:text-red-500 transition-colors'
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4 mt-10'>
          {/* Name Field */}
          <div>
            <label className='block m-2 text-sm font-medium'>Name</label>
            <div className='flex items-center rounded-lg p-4 bg-[#6ede7f]'>
              <input
                type='text'
                name='name'
                value={categoryData.name}
                onChange={handleInputChange}
                className='bg-transparent flex-1 text-white focus:outline-none'
                placeholder='Enter category name'
                required
              />
            </div>
          </div>

          {/* Background Color Field */}
          <div>
            <label className='block m-2 text-sm font-medium'>Background Color</label>
            <div className='flex items-center rounded-lg p-4 bg-[#6ede7f]'>
              <input
                type='text'
                name='bgColor'
                value={categoryData.bgColor}
                onChange={handleInputChange}
                className='bg-transparent flex-1 text-white focus:outline-none'
                placeholder='e.g., #ff0000'
                required
              />
            </div>
          </div>

          {/* Icon Field */}
          <div>
            <label className='block m-2 text-sm font-medium'>Icon URL</label>
            <div className='flex items-center rounded-lg p-4 bg-[#6ede7f]'>
              <input
                type='text'
                name='icon'
                value={categoryData.icon}
                onChange={handleInputChange}
                className='bg-transparent flex-1 text-white focus:outline-none'
                placeholder='Paste icon URL'
                required
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full mt-6 py-2 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg'
          >
            Add Category
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Model;
