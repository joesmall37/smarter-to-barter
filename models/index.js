const User = require('./User');
const Service = require('./Service');

User.hasMany(Service, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Service.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Service};
