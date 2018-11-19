const db = require('../../model/model');

module.exports.product = (req, res ) => {
    db.select().from('products')
    .then(data => {
        console.log(data);
        res.render('page/product',{
            products: data,
            email: req.signedCookies.email
        });
    })
}

module.exports.search = (req, res ) => {
    var q = req.query.q;
    db.select().from('products')
    .whereRaw(`LOWER(name) LIKE ?`, '%' + q.toLowerCase() + '%' )
    .then(data => {
        console.log(data);
        res.render('page/product',{
            q:q,
            products: data,
            email: req.signedCookies.email
        });
    })
}

module.exports.sortByAZ = (req, res) => {
    db.select().from('products')
    .orderBy('name', 'asc')
    .then(data => {
        console.log(data);
        res.render('page/product',{
            products: data,
            email: req.signedCookies.email
        });
    })
}

module.exports.sortByZA = (req, res) => {
    db.select().from('products')
    .orderBy('name', 'desc')
    .then(data => {
        console.log(data);
        res.render('page/product',{
            products: data,
            email: req.signedCookies.email
        });
    })
}

module.exports.priceLow = (req, res) => {
    db.select().from('products')
    .orderBy('price', 'asc')
    .then(data => {
        console.log(data);
        res.render('page/product',{
            products: data,
            email: req.signedCookies.email
        });
    })
}

module.exports.priceHigh = (req, res) => {
    db.select().from('products')
    .orderBy('price', 'desc')
    .then(data => {
        console.log(data);
        res.render('page/product',{
            products: data,
            email: req.signedCookies.email
        });
    })
}