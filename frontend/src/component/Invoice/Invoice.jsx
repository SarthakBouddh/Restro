import React from 'react';

const Invoice = ({ orderInfo, setShowInvoice }) => {
  if (!orderInfo) return null;

  const printInvoice = () => {
    const content = document.getElementById('invoice-content').innerHTML;
    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2, h3, h4 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td, th { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white text-black fixed top-10 left-1/2 -translate-x-1/2 w-[400px] shadow-lg p-6 rounded-lg z-50">
      <div id="invoice-content">
        <h2>Invoice</h2>
        <h4>Order ID: {orderInfo._id}</h4>
        <h4>Customer: {orderInfo.customerDetails.name}</h4>
        <h4>Phone: {orderInfo.customerDetails.phone}</h4>
        <h4>Guests: {orderInfo.customerDetails.guests}</h4>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderInfo.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">Tax</td>
              <td>₹{orderInfo.bills.tax.toFixed(2)}</td>
            </tr>
            <tr className="total">
              <td colSpan="2">Total</td>
              <td>₹{orderInfo.bills.totalWithTax.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <h4>Payment Method: {orderInfo.paymentMethod}</h4>
      </div>

      <div className="mt-4 flex justify-between">
        <button onClick={() => setShowInvoice(false)} className="bg-red-500 px-4 py-2 text-white rounded">
          Close
        </button>
        <button onClick={printInvoice} className="bg-green-600 px-4 py-2 text-white rounded">
          Print
        </button>
      </div>
    </div>
  );
};

export default Invoice;
