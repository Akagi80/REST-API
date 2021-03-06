const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getById);
router.post('/seats', SeatController.addNew);
router.delete('/seats/:id', SeatController.deleteById);
router.put('/seats/:id', SeatController.putById);

module.exports = router;