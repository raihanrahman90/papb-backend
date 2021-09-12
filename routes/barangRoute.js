
var express = require('express');
var router = express.Router();
const barangController = require('../controller/barang');

// Routes
router.route('/')
/**
 * @swagger
 * /barang:
 *  get:
 *      description: Use to get all barang
 *      responses:
 *          '200':
 *              description: A successfull response
 *  post:
 *      description: Use to insert new barang
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          namaBarang:
 *                              type: string
 *                          hargaBarang:
 *                              type: integer
 *                      required:
 *                          - namabarang
 *                          - hargaBarang  
 *      responses:
 *          '200':
 *              description: A Successfull response
 * 
 */
.get(barangController.getAll)
.post(barangController.create)

module.exports = router;
