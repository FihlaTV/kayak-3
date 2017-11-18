const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carBillingSchema = new Schema({
  userId: { type: Number, required: true },
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  dealer: { type: Schema.Types.ObjectId, ref: 'CarDealer', required: true },
  daysBooked: { type: Number, required: true },
  priceBooked: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true, default: Date.now },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

const CarBilling = mongoose.model('CarBilling', carBillingSchema);

module.exports = CarBilling;
