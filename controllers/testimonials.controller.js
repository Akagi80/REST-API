const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    // zliczamy ilość elemnentów
    const count = await Testimonial.countDocuments();
    // losujemy liczbę z ilości dokumentów
    const rand = Math.floor(Math.random() * count);
    // wybieramy pierwszy element zaczynając od tego wylosowanego wyżej :)
    const tes = await Department.findOne().skip(rand);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ 
      author: author, 
      text: text
    });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { author, text } = req.body;
  try {
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { 
        author: author, 
        text: text 
      }});
      res.json({ message: 'OK', modified: tes });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', deleted: tes });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};