var shortid = require('shortid');
const db = require('../model/model');

module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
        signed: true
        });
        db('sessions').insert({
            sessionid: sessionId
        }).then(data2 => {
            console.log('add session');
        })
    }
    next();
}