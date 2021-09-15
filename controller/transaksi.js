const model = require('../models/index');
const transaksi = model.transaksi;
const transaksi_barang = model.transaksi_barang;
exports.getAll = (req, res)=>{
    transaksi.findAll({
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
exports.createTransaksiBarang = async (item, index, id)=>{
    await transaksi_barang.create({
        jumlah:item.jumlah,
        transaksiWaktuId:id,
        transaksiBarangId:item.transaksiBarangId,
    })
}
exports.create = (req, res)=>{
    var date = new Date();
    transaksi.create({
        waktu:date,
        createdAt: date,
        updatedAt:date
    }).then(data=>{
        id = data.id;
        req.body.transaksi_barang.forEach(async (item, index)=>{
            await this.createTransaksiBarang(item, index, id)
        })
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
exports.getOne = (req,res)=>{
    transaksi.findOne({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        transaksi_barang.findAll({
            where:{
                transaksiWaktuId:req.params.id
            }
        }).then(data2=>{
            res.status(200).json({
                responseCode:200,
                responseMessage:"OK",
                responsesData:data,
                responsesData2:data2
            })
        }).catch(err=>{
            res.status(500).json({
                responseCode:500,
                responseMessage:"Error",
                responseData:err
            })
        })
    }).catch(err=>{
        res.status(500).json({
            responseCode:500,
            responseMessage:"Error",
            responseData:err
        })
    })
}

exports.update = (req,res)=>{
    barang.update(req.body, 
        {where:{id:req.params.id}
    }).then(data=>{
        res.status(200).json({
            responseCode:200,
            responseMessage:"OK",
            responsesData:data
        })
    }).catch(err=>{
        res.status(500).json({
            responseCode:500,
            responseMessage:"Error",
            responseData:err
        })
    })
}

exports.delete = (req,res)=>{
    barang.destroy({
        where:{id:req.params.id}
    }).then(data=>{
        res.status(200).json({
            responseCode:200,
            responseMessage:"OK",
            responsesData:data
        })
    }).catch(err=>{
        res.status(500).json({
            responseCode:500,
            responseMessage:"Error",
            responseData:err
        })
    })
}