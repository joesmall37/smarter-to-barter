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
    as: 'serviceRequested',
    onDelete: 'CASCADE'
})

User.hasMany(Offer, {
    foreignKey: 'requester_id',
    as: 'serviceOffered',
    onDelete: 'CASCADE'
})

Offer.belongsTo(User, {
    foreignKey: 'requested_id',
    as: 'requester'
})

Offer.belongsTo(User, {
  foreignKey: "requested_id",
  as: 'requestedUser'
});

Service.hasMany(Offer, {
    foreignKey: {
        field: "service_request_id",
        // as: "serviceRequested"
    },
})

Service.hasMany(Offer, {
  foreignKey: {
    field: "service_offer_id",
    // as: "serviceOffered"
  },
  onDelete: "CASCADE",
});

Offer.belongsTo(Service, {

        foreignKey: 'service_request_id',
        // as: "serviceRequested",

})

Offer.belongsTo(Service, {
    foreignKey: 'service_offer_id',
        // as: "serviceOffered",


})


module.exports = { User, Service, Offer };
