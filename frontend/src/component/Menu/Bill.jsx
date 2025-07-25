import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice, removeAllItems } from '../../redux/slice/CartSlice';
import { enqueueSnackbar } from 'notistack';
import { addOrder, createOrderRazorpay, updateTable, verifyPaymentRazorpay } from '../../https/index';
import { useMutation } from '@tanstack/react-query';
import Invoice from '../Invoice/Invoice';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Bill = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", { variant: "warning" });
      return;
    }

    const createOrderObject = (paymentData = null) => ({
      customerDetails: {
        name: customerData.customerName,
        phone: customerData.customerPhone,
        guests: customerData.guests,
      },
      orderStatus: "In Progress",
      paymentStatus: paymentMethod === "Online" ? "paid" : "pending",
      bills: {
        total,
        tax,
        totalWithTax: totalPriceWithTax,
      },
      items: cartData,
      table: customerData.table.tableId,
      paymentMethod,
      ...(paymentData && { paymentData }),
    });

    if (paymentMethod === "Online") {
      try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
          enqueueSnackbar("Razorpay SDK failed to load.", { variant: "warning" });
          return;
        }

        const { data } = await createOrderRazorpay({ amount: totalPriceWithTax.toFixed(2) });

        const options = {
          key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "RESTRO",
          description: "Secure Payment for Your Meal",
          order_id: data.order.id,
          handler: async (response) => {
            const verification = await verifyPaymentRazorpay(response);
            enqueueSnackbar(verification.data.message, { variant: "success" });
            const orderData = createOrderObject({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            });
            orderMutation.mutate(orderData);
          },
          prefill: {
            name: customerData.customerName,
            contact: customerData.customerPhone,
          },
          theme: { color: "#025cca" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        enqueueSnackbar("Payment Failed!", { variant: "error" });
      }
    } else {
      const orderData = createOrderObject();
      orderMutation.mutate(orderData);
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      setOrderInfo(data);

      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      tableUpdateMutation.mutate(tableData);
      enqueueSnackbar("Order Placed!", { variant: "success" });
      setShowInvoice(true);
    },
    onError: (error) => {
       enqueueSnackbar(error.message , {variant:error})
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: () => {
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="flex items-center justify-between px-5">
        <p className="text-sm text-[#1a7431] font-medium">
          Items({cartData.length})
        </p>
        <h1 className="text-[#1a7431] text-md font-bold">
          ₹{total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5">
        <p className="text-sm text-[#56b06b] font-medium mt-2">Tax(5.25%)</p>
        <h1 className="text-[#1a7431] text-md font-bold">₹{tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5">
        <p className="text-sm text-[#56b06b] font-medium mt-1">
          Total With Tax
        </p>
        <h1 className="text-[#1a7431] text-md font-bold">
          ₹{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center gap-3 px-5 mt-2">
        {["Cash", "Online"].map((type) => (
          <button
            key={type}
            onClick={() => setPaymentMethod(type)}
            className={`px-4 py-2 w-full rounded-lg text-[#1a7431] font-semibold ${
              paymentMethod === type ? "bg-[#36cf4d]" : "bg-[#c7f9cc]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-5 mt-2">
        <button
          disabled={!orderInfo}
          onClick={() => setShowInvoice(true)}
          className={`bg-[#025cca] px-4 py-2 w-full rounded-lg text-white font-semibold text-lg ${
            !orderInfo ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-2 w-full rounded-lg text-white font-semibold text-lg"
        >
          Place Order
        </button>
      </div>

      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;
