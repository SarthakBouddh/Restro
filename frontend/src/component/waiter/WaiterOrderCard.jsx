import React, { useState } from 'react';
import { Clock, UtensilsCrossed, ArrowLeft, ArrowRight } from 'lucide-react'; // Optional icons
import OrderModel from '../Order/orderModel';

const WaiterOrderCard = ({ order, onRevert, onAdvance , revert , advance }) => {
  const { customerDetails, table, items } = order;
  const [activeModel , setActiveModel] = useState(false);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 space-y-3 border dark:border-gray-700 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          {customerDetails?.name || 'Unnamed Customer'}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <Clock size={16} className="inline mr-1" />
          Table: {table?.tableNo || 'N/A'}
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        <UtensilsCrossed size={16} className="inline mr-1" />
        Items: {items.length}
      </div>

      <div className="flex justify-between gap-2 pt-2">
        <div>
            <button
            onClick={() => setActiveModel(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition"
            >
                Show items
            </button>
        </div>
        <div className='flex items-center justify-center gap-2'>
            {onRevert && (
          <button
            onClick={onRevert}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition"
          >
            <ArrowLeft size={16} /> {revert}
          </button>
        )}
        {onAdvance && (
          <button
            onClick={onAdvance}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            {advance} <ArrowRight size={16} />
          </button>
        )}
        </div>
      </div>
      {
        activeModel && (
          <OrderModel
            open={!!activeModel}
            onClose={() => setActiveModel(false)}
            order={order}
          />
        )
      }
    </div>
  );
};

export default WaiterOrderCard;
