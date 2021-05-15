const { Service } = require("../models");

const serviceData = [
  {
    name: "Guitar Lessons",
    description: "I have been teaching guitar for over 30 years. I am passionate about helping my students.",
    points: 20,
    user_id: 1,
  },
  {
    name: "Cooking",
    description: "I have been cooking for 10 years. I was featured on Hell's Kitchen as well.",
    points: 20,
    user_id: 2,
  },
  {
    name: "Moving",
    description: "I have been assisting residents of Brooklyn with moving for over 20 years. I am passionate about moving, and ready to help!",
    points: 20,
    user_id: 3,
  },
  {
    name: "Skiing",
    description: "I have been teaching skiing for 15 years.",
    points: 20,
    user_id: 2,
  },
  {
    name: "Guitar",
    description: "I have been playing for guitar for 60 years. I am passionate about teaching my skills for the next generation.",
    points: 20,
    user_id: 3,
  },
];

const seedServices = () => Service.bulkCreate(serviceData);

module.exports = seedServices;
