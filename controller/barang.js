const model = require('../models/index');
const barang = model.barang;
exports.getAll = (req, res)=>{
    barang.findAll({
        raw:true
    }).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json(err)
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
            success:true,
            message:""
        })
    }).catch(err=>{
        res.status(500).json({
            responseCode:500,
            responseMessage:"Error",
            responseData:err
        })
    })
}
exports.getOne = (req,res)=>{
    barang.findOne({
        where:{
            'id':req.params.id
        }
    }).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
}

exports.update = (req,res)=>{
    barang.update(req.body, 
        {where:{id:req.params.id}
    }).then(data=>{
        res.status(200).json({
            success:true,
            message:""
        })
    }).catch(err=>{
        res.status(500).json({
            success:false,
            message:"Terjadi kesalahan"
        })
    })
}

exports.delete = (req,res)=>{
    barang.destroy({
        where:{id:req.params.id}
    }).then(data=>{
        res.status(200).json({
            success:true,
            message:""
        })
    }).catch(err=>{
        res.status(500).json({
            success:false,
            message:"Terjadi kesalahan"
        })
    })
}