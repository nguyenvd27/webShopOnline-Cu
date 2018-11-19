const db = require('../model/model');

module.exports.reqMiddleware = (req, res, next) => {
    if(req.signedCookies.email){
        db.select('*').from('users')
        .where('email', '=', req.signedCookies.email)
        .then(data => {
            console.log(data);
            res.locals.user = data[0];
        })
    }
    
    next();
}