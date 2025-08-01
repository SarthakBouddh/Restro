import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrder, updateOrder } from '../https/index';
import { enqueueSnackbar } from 'notistack';
import WaiterOrderCard from '../component/waiter/WaiterOrderCard';


const WaiterPage = () => {
  const queryClient = useQueryClient();
  const { data: resData, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrder,
  });

  const mutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) => updateOrder({ orderId, orderStatus }),
    onSuccess: () => {
      enqueueSnackbar('Order status updated!', { variant: 'success' });
      queryClient.invalidateQueries(['orders']);
    },
    onError: () => {
      enqueueSnackbar('Failed to update order status!', { variant: 'error' });
    },
  });

  const orders = resData?.data?.data || [];

  // Filter out completed orders
  const filteredOrders = orders.filter(o => o.orderStatus !== 'Completed');

  // Partition orders by status
  const acceptOrders = filteredOrders.filter(o => o.orderStatus === 'In Progress');
  const preparationOrders = filteredOrders.filter(o => o.orderStatus === 'Preparation');
  const readyOrders = filteredOrders.filter(o => o.orderStatus === 'Ready');

  // Helper to get next/prev status
  const getNextStatus = (status) => {
    if (status === 'In Progress') return 'Preparation';
    if (status === 'Preparation') return 'Ready';
    if(status === 'Ready') return 'Completed';
    return null;
  };
  const getPrevStatus = (status) => {
    if (status === 'Ready') return 'Preparation';
    if (status === 'Preparation') return 'In Progress';
    if(status === 'Completed')return 'Completed';
    return null;
  };


  return (
    <div className="flex bg-[#b7efc5] dark:bg-[#1a2233] min-h-screen p-6 gap-6">
      {/* Accept */}
      <div className="flex-1 bg-[#80ed99] rounded-xl p-5 h-[75vh] mt-5 overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-bold mb-4 text-[#1a7431] dark:text-[#7fffd4]">Accept</h2>
        {acceptOrders.length === 0 ? "No orders to accept" :
        acceptOrders.map(order => (
          <WaiterOrderCard
            key={order._id}
            order={order}
            onRevert={null}
            onAdvance={() => mutation.mutate({ orderId: order._id, orderStatus: getNextStatus(order.orderStatus) })}
            revert = {null}
            advance={"accept"}
          />
        ))}
      </div>
      {/* Preparation */}
      <div className="flex-1 bg-[#80ed99] rounded-xl p-5 h-[75vh] mt-5 overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-bold mb-4 text-[#1a7431] dark:text-[#7fffd4]">Preparation</h2>
        {preparationOrders.length == 0 ? "No orders in preparation" :
         preparationOrders.map(order => (
          <WaiterOrderCard
            key={order._id}
            order={order}
            onRevert={() => mutation.mutate({ orderId: order._id, orderStatus: getPrevStatus(order.orderStatus) })}
            onAdvance={() => mutation.mutate({ orderId: order._id, orderStatus: getNextStatus(order.orderStatus) })}
            revert = {"Hold"}
            advance={"Prepared"}
          />
        ))}
      </div>
      {/* Ready */}
      <div className="flex-1 bg-[#80ed99] rounded-xl p-5 h-[75vh] mt-5 overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-bold mb-4 text-[#1a7431] dark:text-[#7fffd4]">Ready</h2>
        {readyOrders.length === 0 ? "No ready orders" :
          readyOrders.map(order => (
            <WaiterOrderCard
              key={order._id}
              order={order}
              onRevert={() => mutation.mutate({ orderId: order._id, orderStatus: getPrevStatus(order.orderStatus) })}
              onAdvance={() => mutation.mutate({ orderId: order._id, orderStatus: getNextStatus(order.orderStatus) })}
              revert = {"Hold"}
              advance={"Completed"}
            />
          ))}
      </div>
    </div>
  )
}

export default WaiterPage