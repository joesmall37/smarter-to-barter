const sequelize = require('../config/connection');
const { User } = require('../models');
const seedServices = require('./service-seeds');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await seedServices();
  console.log('\n----- Services SEEDED -----\n');

  process.exit(0);
};




seedDatabase();
