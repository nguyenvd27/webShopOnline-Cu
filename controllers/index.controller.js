const db = require('../model/model');

module.exports.getProducts = (req, res) => {
    db.select().from('products')
    .then(data => {
        db.select().from('carousels')
        .then(carousels => {
            db.select().from('featuredproducts')
            .then(featuredproducts => {
                res.render('page/index',{
                    products: data,
                    carousels: carousels,
                    featuredproducts: featuredproducts,
                    email: req.signedCookies.email
                })
            })
        })
    })
};

module.exports.logout = (req, res) => {
    res.clearCookie('email');
    res.redirect('/');
}