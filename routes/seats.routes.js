const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db')

router.route('/seats').get((req, res) => {
    res.json(db.seats);  
});
router.route('/seats').get((req, res) => {
  res.json(db.seats);  
});
  
router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id]);
});
  
router.route('/seats').post((req, res) => {
  const data = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  if (db.seats.some(pickedSeat => (pickedSeat.day == req.body.day && pickedSeat.seat == req.body.seat))) {
    res.status(404).json({ message: 'The slot is already taken...' });
  } else {
    db.seats.push(data);
    // dzięki req.io (stworzony w server.js) mamy dostęp do serwera WebSocket
    req.io.emit('seatsUpdated', db.seats)
    res.json(db.seats);
  }
});
  
router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(`${req.params.id}`, 1);
  res.json({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  db.seats.forEach(element => {
    if (element.id == req.params.id) {
      element.day = req.body.day,
      element.seats = req.body.seats,
      element.client = req.body.client,
      element.email = req.body.email
    }
  });
  res.json({message: 'OK'});
});

module.exports = router;