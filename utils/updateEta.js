const updateEta = async (Order, orderDoc, orderId) => {
  let updatedEta = Math.floor((orderDoc.finishedAt - new Date()) / 60000);
  if (updatedEta <= 0) updatedEta = 0;

  const updatedDoc = await Order.findByIdAndUpdate(orderId, { eta: updatedEta }, { new: true });

  return updatedDoc.eta;
};

module.exports = updateEta;
