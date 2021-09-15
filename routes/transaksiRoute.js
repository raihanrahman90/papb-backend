
var express = require('express');
var router = express.Router();
const transaksiController = require('../controller/transaksi');

// Routes
router.route('/')
.get(transaksiController.getAll)
.post(transaksiController.create)

router.route('/:id')
.get(transaksiController.getOne)
.post(transaksiController.update)
.delete(transaksiController.delete)
module.exports = router;
