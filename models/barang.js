'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.transaksi_barang.belongsTo(barang, {foreign_key:'idBarang',as:"transaksi_barang"})
    }
  };
  barang.init({
    namaBarang: DataTypes.STRING,
    hargaBarang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};