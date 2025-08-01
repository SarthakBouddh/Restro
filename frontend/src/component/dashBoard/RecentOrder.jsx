import React from "react";
import { GrUpdate } from "react-icons/gr";
import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrder, updateOrder } from '../../https/index';
import { formatDateAndTime } from "../../pages/index";
import { FaLongArrowAltRight } from "react-icons/fa";

const RecentOrder = ({ onlyCurrent }) => {
  const queryClient = useQueryClient();

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrder(),
    placeholderData: keepPreviousData,
  });
  

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) => updateOrder({ orderId, orderStatus }),
    onSuccess: () => {
      enqueueSnackbar("Order status updated successfully!", { variant: "success" });
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["tables"]);
    },
    onError: () => {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  });

  const handleStatusChange = ({ orderId, orderStatus }) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  if (isError) {
    enqueueSnackbar("Something went wrong while loading orders!", { variant: "error" });
    return null;
  }

  return (
    <div className="container p-4 rounded-lg recentOrder">
      <h2 className="text-[#1a7431] text-3xl font-semibold mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#1a7431]">
          <thead className="bg-[#2c8941] text-[#80ed99]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#80ed99]">
            {(resData?.data.data
              ?.filter(order => {
                if (onlyCurrent) {
                  return order.orderStatus !== 'Completed';
                } else {
                  return order.orderStatus === 'Completed';
                }
              })
              || []).map((order) => (
              <tr key={order._id} className="border-b border-gray-600 hover:bg-[#29bf12]">
                <td className="p-4">#{Math.floor(new Date(order.orderDate).getTime())}</td>
                <td className="p-4">{order.customerDetails.name}</td>
                <td className="p-4">
                  <select
                    className={`bg-[#6ede7f] border border-gray-500 p-2 rounded-lg focus:outline-none ${order.orderStatus === "Ready" && "text-[#1a7431]"}
                     ${order.orderStatus === "In Progress" && "text-yellow-600"} ${order.orderStatus === "Completed" && "text-teal-700"}`}
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange({
                        orderId: order._id,
                        orderStatus: e.target.value,
                      })
                    }
                  >
                    <option className="text-yellow-500" value="In Progress">In Progress</option>
                    <option className="text-green-500" value="Ready">Ready</option>
                    <option className="text-teal-500" value="Completed">Completed</option>
                  </select>
                </td>
                <td className="p-4">{formatDateAndTime(order.orderDate)}</td>
                <td className="p-4">{order.items.length} Items</td>
                <td className="p-4 flex items-center gap-1">
                  Table <FaLongArrowAltRight className="text-[#1a7431]" /> {order?.table?.tableNo}
                </td>
                <td className="p-4">₹{order.bills.totalWithTax.toFixed(2)}</td>
                <td className="p-4 text-center">
                  <button className="text-[#1a7431] transition">
                    <GrUpdate size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
