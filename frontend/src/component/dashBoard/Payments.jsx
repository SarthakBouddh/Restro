import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrder, updateOrder } from '../../https/index';
import { enqueueSnackbar } from 'notistack';
import { formatDateAndTime } from '../../pages/index';
import { FaLongArrowAltRight  , FaFileInvoice, FaFileDownload, FaDownload} from "react-icons/fa";
import { useState } from 'react';
import Invoice from '../Invoice/Invoice';

const Payments = () => {
  const queryClient = useQueryClient();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();

  const {data: resData , isError} = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrder(),
    placeholderData: keepPreviousData,
  })

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, paymentStatus }) => updateOrder({ orderId, paymentStatus }),
    onMutate: async ({ orderId, paymentStatus }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(["orders"]);

      // Snapshot the previous value
      const previousOrders = queryClient.getQueryData(["orders"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["orders"], (old) => {
        if (!old?.data?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: old.data.data.map(order => 
              order._id === orderId 
                ? { ...order, paymentStatus } 
                : order
            )
          }
        };
      });

      // Return a context object with the snapshotted value
      return { previousOrders };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousOrders) {
        queryClient.setQueryData(["orders"], context.previousOrders);
      }
      enqueueSnackbar("Failed to update payment status!", { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("Payment status updated successfully!", { variant: "success" });
      // Refetch to ensure we have the latest data
      queryClient.invalidateQueries(["orders"]);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(["orders"]);
    }
  });

  const handleStatusChange = ({ orderId, paymentStatus }) => {
    orderStatusUpdateMutation.mutate({ orderId, paymentStatus });
  };

  if(isError){
    enqueueSnackbar("Failed to load payments", { variant: "error" });
  }

  const handleInvoice = (order) => {
    setShowInvoice(true);
    setOrderInfo(order);
  }

  const orders = resData?.data?.data || [];

  return (
    <div className="container mx-auto p-4 rounded-lg recentOrder">
      <h2 className="text-[#1a7431] text-xl font-semibold mb-4">All Payments</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#1a7431]">
          <thead className="bg-[#2c8941] text-[#80ed99]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Payment Method</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3 text-center">Invoice</th>
            </tr>
          </thead>
          <tbody className='bg-[#80ed99]'>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-600 hover:bg-[#29bf12]">
                <td className="p-4">#{Math.floor(new Date(order.orderDate).getTime())}</td>
                <td className="p-4">{order.customerDetails.name}</td>
                <td className="p-4">
                <select
                    className={`bg-[#6ede7f] border border-gray-500 p-2 rounded-lg focus:outline-none ${order.paymentStatus === "paid" && "text-[#1a7431]"}
                     ${order.paymentStatus === "pending" && "text-red-500"}`}
                    value={order.paymentStatus || "pending"}
                    onChange={(e) =>
                      handleStatusChange({
                        orderId: order._id,
                        paymentStatus: e.target.value,
                      })
                    }
                  >
                    <option className="text-red-500" value="pending">Unpaid</option>
                    <option className="text-[#1a7431]" value="paid">Paid</option>
                  </select>
                </td>
                <td className="p-4">{formatDateAndTime(order.orderDate)}</td>
                <td className="p-4 capitalize">{order.paymentMethod || "cash"}</td>
                <td className="p-4 flex items-center gap-1">
                  Table <FaLongArrowAltRight className="text-[#1a7431]" /> {order?.table?.tableNo}
                </td>
                <td className="p-4">₹{order.bills.totalWithTax.toFixed(2)}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleInvoice(order)} className="text-[#1a7431] hover:text-blue-500 transition">
                    <FaDownload size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </div>
  );
};

export default Payments;
