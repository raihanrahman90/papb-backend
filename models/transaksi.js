'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.transaksi_barang.belongsTo(transaksi, {foreign_key:'idTransaksi',as:'transaksi_waktu'})
    }
  };
  transaksi.init({
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};