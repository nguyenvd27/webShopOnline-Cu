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
    db('cartsessions').where('sessionid','=',req.signedCookies.sessionId)
    .then(data => {
        var price =0;
        var countItem =0;
        if(data.length>0){
            countItem = data.length;
            for(var i=0;i< data.length; i++){
                price = price + data[i].price*data[i].quantity;
            }
            // console.log('price: ', totalPrice);
            // console.log('count: ', countItem);
        }
        res.locals.countItem = countItem;
        res.locals.price = price;
        
    })
    next();
}