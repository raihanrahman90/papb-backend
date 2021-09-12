'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('barangs', [
      {
        namaBarang: 'Kopi Luwak',
        hargaBarang:  10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        namaBarang: 'Kopi Cappucino',
        hargaBarang: 15000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        namaBarang: 'Ice Tea',
        hargaBarang: 30000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    await queryInterface.bulkInsert('transaksis', [
      {
        waktu: new Date(),
      },
      {
        waktu: new Date(),
      },
      {
        waktu: new Date()
      }
  ], {});
    const barang = await queryInterface.sequelize.query(
      `select id from barangs;`
    );
    const barangRows = barang[0];
    const transaksi = await queryInterface.sequelize.query(
      `select id from transaksis;`
    );
    const transaksiRows = transaksi[0];
    await queryInterface.bulkInsert(
      'transaksi_barangs',[
        {jumlah:3, transaksiBarangId:barangRows[0].id,transaksiWaktuId:transaksiRows[0].id,createdAt:new Date(), updatedAt: new Date()},
        {jumlah:2, transaksiBarangId:barangRows[1].id,transaksiWaktuId:transaksiRows[0].id,createdAt:new Date(), updatedAt: new Date()},
        {jumlah:2, transaksiBarangId:barangRows[2].id,transaksiWaktuId:transaksiRows[0].id,createdAt:new Date(), updatedAt: new Date()},
        {jumlah:1, transaksiBarangId:barangRows[0].id,transaksiWaktuId:transaksiRows[1].id,createdAt:new Date(), updatedAt: new Date()},
        {jumlah:1, transaksiBarangId:barangRows[0].id,transaksiWaktuId:transaksiRows[2].id,createdAt:new Date(), updatedAt: new Date()},
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('barangs', null, {});
    await queryInterface.bulkDelete('transaksis', null, {});
    await queryInterface.bulkDelete('transaksi_barangs', null, {});
  }
};
