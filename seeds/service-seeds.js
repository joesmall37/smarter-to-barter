const { Service } = require('../models');

const serviceData = [
    {
        title: 'Cleaning',
        description: 'I love to clean and I have a five star rating',
        points: 20,
        user_id: 1,
    },
    {
        title: 'Cooking',
        description: 'I love to cook and I have a five star rating',
        points: 20,
        user_id: 2,
    },
    {
        title: 'Moving',
        description: 'I love to move and I have a five star rating',
        points: 20,
        user_id: 3,
    },
    {
        title: 'Skiing',
        description: 'I love to ski and I have a five star rating',
        points: 20,
        user_id: 4,
    },
    {
        title: 'Guitar',
        description: 'I love to play guitar and I have a five star rating',
        points: 20,
        user_id: 5,
    },

]

const seedServices = () => Service.bulkCreate(serviceData);

module.exports = seedServices;
