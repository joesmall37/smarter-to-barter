const User = require('./User');
const Service = require('./Service');
const Provider = require('./Provider');

User.hasMany(Service, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Service.belongsTo(User, {
    foreignKey: 'user_id'
})

Provider.hasMany(Service, {
    foreignKey: 'provider_id',
    onDelete: 'CASCADE'
})
Service.belongsTo(Provider, {
    foreignKey: 'service_id'
})


module.exports = { User, Service};
