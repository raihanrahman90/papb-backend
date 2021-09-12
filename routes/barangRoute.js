
var express = require('express');
var router = express.Router();
const barangController = require('../controller/barang');

/* GET users listing. */
router.route('/')
.get(barangController.getAll)
.post(barangController.create)

module.exports = router;
