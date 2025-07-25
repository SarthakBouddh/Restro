import React from 'react'

const Model = ({ title, onClose, isOpen, children }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-[#80ed99] shadow-lg w-full max-w-lg mx-4 rounded-lg p-4'>
        <div className='flex justify-between items-center px-5 py-4 border-b border-[#333]'>
          <h2 className='text-xl text-[#f5f5f5] font-semibold'>{title}</h2>
          <button onClick={onClose} className='text-gray-500 text-2xl hover:text-gray-300'>
            &times;
          </button>
        </div>
        <div className='p-6'>{children}</div>
      </div>
    </div>
  )
}

export default Model
