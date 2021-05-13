// render the offer routes to the profile page



// if I make an offer = add it to my "chosen section on my profile page"

// create offers
// POST api/service -- create a new offer
router.post('/userprofile', withAuth, async (req, res) => {
    // expects object of the form {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
    try {
        const newOffer = await Offer.create({
            requester_id: req.session.user_id,
            requested_id: req.body.requested_id,
            service_request_id: req.session.service_request_id,
            service_offer_id: req.body.service_offer_id,
        });
        res.status(200).json(newOffer);
    } catch (err) {
        res.status(500).json(err);
    }
});


// view my offers

router.get('/userprofile', (req, res) => {
    Offers.findAll({

        attributes: [
            'id',
            'requester_id',
            'requested_id',
            'service_request_id',
            'service_offer_id',
        ],
        // Order the Offers from most recent to least
        order: [['created_at', 'DESC']],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     },

        // ]
    }) // return the offers
        .then(dbOfferData => res.json(dbOfferData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

})
// how about we just have a chosen section = if I choose a service - it gets added to the chosen section on my profile



//  to do that we will first need to have the services rendered



// then we will need to have a js file to capture the even of choosing the service

// upon presssing the button it should triggered the chosen one to be render to my profile page - the /userprofile
