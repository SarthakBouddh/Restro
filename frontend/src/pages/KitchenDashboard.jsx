import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrder, updateOrder } from '../https/index';
import { enqueueSnackbar } from 'notistack';

const statusFlow = ['Accept', 'Preparation', 'Ready'];

const statusMap = {
  Accept: 'In Progress',
  Preparation: 'Preparation',
  Ready: 'Ready',
};

const KitchenDashboard = () => {
  
  return (
    <div className="flex bg-[#b7efc5] dark:bg-[#1a2233] min-h-screen p-6 gap-6">
      {/* Accept */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-[#1a7431] dark:text-[#7fffd4]">Accept</h2>
        {acceptOrders.map(order => (
          <KitchenOrderCard
            key={order._id}
            order={order}
            onRevert={null}
            onAdvance={() => mutation.mutate({ orderId: order._id, orderStatus: getNextStatus(order.orderStatus) })}
          />
        ))}
      </div>
      {/* Preparation */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-[#1a7431] dark:text-[#7fffd4]">Preparation</h2>
        {preparationOrders.map(order => (
          <KitchenOrderCard
            key={order._id}
            order={order}
            onRevert={() => mutation.mutate({ orderId: order._id, orderStatus: getPrevStatus(order.orderStatus) })}
            onAdvance={() => mutation.mutate({ orderId: order._id, orderStatus: getNextStatus(order.orderStatus) })}
          />
        ))}
      </div>
      {/* Ready */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-[#1a7431] dark:text-[#7fffd4]">Ready</h2>
        {readyOrders.map(order => (
          <KitchenOrderCard
            key={order._id}
            order={order}
            onRevert={() => mutation.mutate({ orderId: order._id, orderStatus: getPrevStatus(order.orderStatus) })}
            onAdvance={null}
          />
        ))}
      </div>
    </div>
  );
};

export default KitchenDashboard;
