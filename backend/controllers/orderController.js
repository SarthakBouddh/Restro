const createHttpError = require("http-errors");
const Order = require("../models/orderModel")
const mongoose = require("mongoose")
const Table = require("../models/tableModel")

const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({
      success: true,
      message: "Order Created!",
      data: order
    })
  } catch (error) {
    next(error)
  }
}

const getOrderById = async (req, res, next) => {
  try {
    
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = await Order.findById(id);

    if (!order) {
      const error = createHttpError(404, "Order not found");
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: order
    })

  } catch (error) {
    next(error);
  }
}


const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("table");
    res.status(200).json({ data: orders })
  } catch (error) {
    next(error)
  }
}


const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid id!"));
    }

    // Create update object with only the fields that are provided
    const updateData = {};
    if (orderStatus !== undefined) updateData.orderStatus = orderStatus;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!order) {
      return next(createHttpError(404, "Order not found"));
    }

    // If order is completed, update the table status to Available and clear currentOrder
    if (orderStatus === 'Completed' && order.table) {
      await Table.findByIdAndUpdate(order.table, {
        status: 'Available',
        currentOrder: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Order Updated!",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { addOrder, getOrderById, getOrders, updateOrder };