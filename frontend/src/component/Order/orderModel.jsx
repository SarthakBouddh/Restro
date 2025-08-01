import React from "react";

const OrderModel = ({ open, onClose, order }) => {
  if (!open || !order) return null;
  console.log(order);
  

  return (
    <div className="fixed inset-0 text-[#1a7431] bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#222] rounded-lg p-6 min-w-[320px] max-w-[90vw] relative">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-2">Order Details</h2>
        <div className="mb-2"><b>Name:</b> {order.customerDetails.name}</div>
        <div className="mb-2"><b>Table:</b> {order.table.tableNo}</div>
        <h3 className="text-md font-semibold mt-4 mb-2">Items</h3>
        <ul className="list-disc ml-5 space-y-2">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.name}</span> &times; {item.quantity}
              </li>
            ))
          ) : (
            <li>No items found.</li>
          )}
        </ul>
        {order.note && (
          <div className="mt-4">
            <b>Note:</b> {order.note}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModel;