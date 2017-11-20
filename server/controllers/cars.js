const mongoose = require('mongoose');
const Car = require('../models/mongooseCar');
const CarDealer = require('../models/mongooseCarDealer');
const CarBilling = require('../models/mongooseCarBilling');

exports.create = (req, res) => {
  console.log('createNewCar');
  const data = req.body;

  Car.create({
    type: data.type,
    make: data.make,
    model: data.model,
    dealer: mongoose.Types.ObjectId(data.dealer),
    description: data.description,
    price: data.price,
    doorNumber: data.doorNumber,
    capacity: data.capacity,
  }, (err, newCar) => {
    res.json(newCar);
  });
};

exports.getAll = (req, res) => {
  Car
    .find({})
    .populate('dealer')
    .exec((err, results) => {
      console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};

exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Car
    .findById(id)
    .populate('dealer')
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;

  // Car.findById(id)
  //   .exec((err, result) => {
  //     if (err) res.json(err);

  //     result.type = req.body.type;
  //     result.make = req.body.make;
  //     result.model = req.body.model;
  //     result.description = req.body.description;
  //     result.price = req.body.price
  //     result.
  //   });

  // skip updating dealer for now.
  Car.findByIdAndUpdate(
    id,
    {
      $set: {
        type: req.body.type,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        doorNumber: req.body.doorNumber,
        capacity: req.body.capacity,
      },
    },
    (err, result) => {
      console.log('after edit car result=', result);
      // if (result.nModified === 1) {
      //   console.log(`car id=[${id}] has been updated successfully`);
      //   res.json(true);
      // } else {
      //   res.json(false);
      // }
      if (err) res.json(false);
      res.json(true);
    }
  );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Car.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    (err, result) => {
      console.log('after car delete result=', result);
      if (err) res.json(false);
      res.json(true);
    }
  );
};