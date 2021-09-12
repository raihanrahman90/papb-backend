
var express = require('express');
var router = express.Router();
const barangController = require('../controller/barang');

// Routes
router.route('/')
.get(barangController.getAll)
.post(barangController.create)

router.route('/:id')
.get(barangController.getOne)
.post(barangController.update)
.delete(barangController.delete)
module.exports = router;
