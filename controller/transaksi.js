const { sequelize } = require('../models/index');
const model = require('../models/index');
const transaksi = model.transaksi;
const transaksi_barang = model.transaksi_barang;
const barang = model.barang;
exports.getAll = (req, res)=>{
    transaksi_barang.findAll({
        include:[
            {
                model:transaksi,
                as:"transaksi_waktu",
                required:true,
            },
            {
                model:barang,
                as:"transaksi_detail",
                required:true,
            }
        ],
        attributes:[
            [sequelize.literal('transaksi_waktu.id'),"id"],
            [sequelize.cast(sequelize.literal('(`transaksi_detail`.hargaBarang * `transaksi_barang`.jumlah)'),'int'), 'totalTransaksi'],
            [sequelize.literal('transaksi_waktu.waktu'), 'waktu'],
        ],
        group:["transaksiWaktuId"]
    }).then(data=>{
        res.status(200).json(
            data
        )
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            success:false,
            message:err
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
            success:true,
            message:"Data berhasil ditambahkan"
        })
    }).catch(err=>{
        res.status(500).json({
            success:false,
            message:err
        })
    })
}
exports.getOne = (req,res)=>{
    transaksi.findOne({
        where:{
            id:req.params.id
        },
        
    }).then(data=>{
        transaksi_barang.findAll({
            include:[
                {
                        model:barang,
                        as:"transaksi_detail",
                    required:true,
                }
            ],
            where:{
                transaksiWaktuId:req.params.id
            },
            attributes:[
                'jumlah'
            ]
        }).then(data2=>{
            res.status(200).json({
                id:data.id,
                waktu:data.waktu,
                totalTransaksi:data2.reduce((a,b)=>a+(b['dataValues']['jumlah'] * b['dataValues']['transaksi_detail']['dataValues']['hargaBarang']),0),
                barang:data2
            })
        }).catch(err=>{
            console.log(err)
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