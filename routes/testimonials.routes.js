const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db')

// zwraca całą zawartość tablicy
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);  
});
// zwracamy tylko jeden element tablicy, zgodny z :id
router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id]);
});
// zwracamy losowy element z tablicy
router.route('/testimonials/random').get((req, res) => {
  const randomId = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomId]);
});
// dodajemy nowy element do tablicy. Możesz założyć, że body przekazywane przez klienta będzie obiektem z dwoma atrybutami author i text. Id dodawanego elementu musisz losować (uuivd4).
router.route('/testimonials').post((req, res) => {
  const data = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  }
  db.testimonials.push(data);
  res.json({message: 'OK'});
});
// modyfikujemy atrybuty author i text elementu tablicy o pasującym :id. Załóż, że body otrzymane w requeście będzie obiektem z atrybutami author i text.
router.route('/testimonials/:id').put((req, res) => {
  db.testimonials[req.params.id].author = req.body.author;
  db.testimonials[req.params.id].text = req.body.text;
  res.json({message: 'OK'});
});
// usuwamy z tablicy wpis o podanym id.
router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(`${req.params.id}`, 1);
  res.json({message: 'OK'});
});

module.exports = router;