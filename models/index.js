const User = require('./User');
const Service = require('./Service');
const Offer = require('./Offer');

User.hasMany(Service, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Service.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Offer, {
    foreignKey: 'requested_id',
    onDelete: 'CASCADE'
})

User.hasMany(Offer, {
    foreignKey: 'requester_id',
    onDelete: 'CASCADE'
})

Offer.belongsTo(User, {
    foreignKey: 'requested_id'
})

Offer.belongsTo(User, {
  foreignKey: "requested_id",
});

Service.hasMany(Offer, {
    foreignKey: 'service_request_id',
    onDelete: 'CASCADE'
})

Service.hasMany(Offer, {
  foreignKey: "service_offer_id",
  onDelete: "CASCADE",
});

Offer.belongsTo(Service, {
    foreignKey: 'service_request_id'
})

Offer.belongsTo(Service, {
    foreignKey: 'service_offer_id'
})


module.exports = { User, Service, Offer };
