const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { cart } = req.session.user;
        const { id } = req.query;

        const index = cart.findIndex( swag => swag.id == id);

        if(index === -1) {
            const selectedSwag = swag.find( swag => swag.id == id);
            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        } 
        res.status(200).send(req.session.user)
    },

    remove: (req, res, next) => {
        const { cart } = req.session.user;
        const { id } = req.query;

        const selectedSwag = swag.find( swag => swag.id == id);

        if(selectedSwag) {
            console.log(selectedSwag);
            const index = cart.findIndex(swag => swag.id == id);
            console.log(index);
            cart.splice(index, 1);
            req.session.user.total -= selectedSwag.price;
        }
        res.status(200).send(req.session.user);
    },

    checkout: (req, res, next) => {
        const { user } = req.session;

        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user);
    }
}