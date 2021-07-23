const Concert = require('../models/concert.model');
const Workshop = require('../models/workshop.model');
const sanitize = require('mongo-sanitize');

// WORKSHOPS ADD??!!
exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find().lean();
    const ConWorkshop = [];

    for(const concert of concerts) {
      ConWorkshop.push({
          ...concert,
          workshops: await Workshop.find({ concertId: concert._id }).lean()
      })
    }
    res.json(ConWorkshop);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getById = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    // const { performer, genre, price, day, image } = req.body;
    const sanPreformer = sanitize(req.body.preformer);
    const sanGenere = sanitize(req.body.genre);
    const sanPrice = sanitize(req.body.price);
    const sanDay = sanitize(req.body.day);
    const sanImage = sanitize(req.body.image);

    const newConcert = new Concert({ 
      performer: sanPreformer, 
      genre: sanGenere, 
      price: sanPrice, 
      day: sanDay, 
      image: sanImage 
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', deleted: conc });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image }});
      res.json({ message: 'OK', modified: conc });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};