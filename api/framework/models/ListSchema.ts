
const { Sequelize } = require('sequelize');


export const ListSchema = {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
};