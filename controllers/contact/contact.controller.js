const db = require('../../model/model');

module.exports.contact = (req, res ) => {
    //res.send('hello word');
    res.render('page/contact.pug',{
        email: req.signedCookies.email
    });
}