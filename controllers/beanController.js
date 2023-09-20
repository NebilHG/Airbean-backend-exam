const Product = require('../models/productModel');
const Order = require('../models/orderModel');

const updateEta = require('../utils/updateEta');

exports.getAllProducts = async (req, res, next) => {
  try {
    const allDocs = await Product.find();
    console.log(allDocs);

    res.status(200).json({
      status: 'success',
      results: allDocs.length,
      data: {
        produkter: allDocs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Någonting gick fel.',
    });
  }
};

exports.postOrderGuest = async (req, res, next) => {
  try {
    const validProducts = await Product.find({
      _id: {
        $in: req.body,
      },
    });

    newOrder = validProducts.map((product, i) => {
      return {
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: req.body[i].quantity,
        totalProductPrice: 1,
      };
    });

    const newDoc = await Order.create({ products: newOrder });

    res.status(200).json({
      status: 'success',
      data: {
        order: newDoc,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Någonting gick fel.',
    });
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const validProducts = await Product.find({
      _id: {
        $in: req.body,
      },
    });

    newOrder = validProducts.map((product, i) => {
      return {
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: req.body[i].quantity,
        totalProductPrice: 1,
      };
    });

    const newDoc = await Order.create({ user: req.user._id, products: newOrder });

    res.status(200).json({
      status: 'success',
      data: {
        order: newDoc,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Någonting gick fel.',
    });
  }
};

exports.getOrderStatus = async (req, res, next) => {
  try {
    const orderDoc = await Order.findById(req.params.id);

    if (!orderDoc) {
      return res.status(404).json({
        status: 'success',
        message: 'Ingen order med det id:et funnet.',
      });
    }

    const updatedDoc = await updateEta(Order, orderDoc, req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        eta: updatedDoc,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Någonting gick fel.',
    });
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const allDocs = await Order.find({ user: req.user._id });

    res.status(200).json({
      status: 'success',
      results: allDocs.length,
      data: {
        allDocs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Någonting gick fel.',
    });
  }
};

exports.getActiveOrders = async (req, res, next) => {
  try {
    const allDocs = await Order.find({ user: req.user._id, finishedAt: { $gt: new Date() } });

    const updatedDocs = await Promise.all(
      allDocs.map(async (doc) => {
        const updatedEta = await updateEta(Order, doc, doc._id);
        return { ...doc.toObject(), eta: updatedEta };
      })
    );

    res.status(200).json({
      status: 'success',
      results: allDocs.length,
      data: {
        updatedDocs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Någonting gick fel.',
    });
  }
};
