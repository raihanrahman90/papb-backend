'use strict';
// @ts-check
/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} Sequelize
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('transaksi_barangs', 'idTransaksi'),
      queryInterface.removeColumn('transaksi_barangs', 'idBarang')
    
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
