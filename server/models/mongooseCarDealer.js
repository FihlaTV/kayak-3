const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carDealerSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: String, required: true },
}, {
  timestamps: true,
});

carDealerSchema.index({
  name: 'text',
  city: 'text',
});

const CarDealer = mongoose.model('CarDealer', carDealerSchema);

module.exports = CarDealer;
