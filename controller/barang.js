const model = require('../models/index');
const barang = model.barang;
exports.getAll = (req, res)=>{
    barang.findAll({
        raw:true
    }).then(data=>{
        res.status(200).json({
            responseCode : 200,
            reponseMessage:"OK",
            responseData:data
        })
    }).catch(err=>{
        res.status(500).json({
            responseCode:500,
            responseMessage:"Error",
            responseData:err
        })
    })
}
exports.create = (req, res)=>{
    var date = new Date();
    barang.create({
        namaBarang:req.body.namaBarang,
        hargaBarang:req.body.hargaBarang,
        createdAt: date,
        updatedAt:date
    }).then(data=>{
        res.status(200).json({
            responseCode:200,
            responseMessage:"OK",
            responseData:data
        })
    }).catch(err=>{
        res.status(500).json({
            responseCode:500,
            responseMessage:"Error",
            responseData:err
        })
    })
}