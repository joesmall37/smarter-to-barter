// const { Model, DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");
// const sequelize = require("../config/connection");

// class Provider extends Model { }

// Provider.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         description: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         points: {
//             allowNull: false,
//             type: DataTypes.INTEGER,
//         },
//         service_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'Service',
//                 key: 'id',
//             }
//         }
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: "provider",
//     }
// );

// module.exports = Provider;
