const db = require('../../model/model');

module.exports.register = (req, res ) => {
    res.render('page/register',{
        email: req.signedCookies.email
    });
}

module.exports.submit = (req, res) => {
    var sessionId = req.signedCookies.sessionId;
    var infor = req.body.infor;
    console.log(req.body.infor);
    var name, phone, email, address, city, addinfor, totalprice=0;
    for(var i=0; i<infor.length;i++){
        if(infor[i].name === 'fullName'){
            name = infor[i].value;
        }else if(infor[i].name==='phone'){
            phone = infor[i].value;
        }else if(infor[i].name==='email'){
            email = infor[i].value;
        }else if(infor[i].name==='address'){
            address = infor[i].value;
        }else if(infor[i].name==='city'){
            city = parseInt(infor[i].value);
        }else if(infor[i].name==='aditionalInfo'){
            addinfor = infor[i].value;
        }
    }

    db.select('price', 'quantity').from('cartsessions')
    .where('sessionid', '=', sessionId)
    .then(data => {
        console.log(data);
        for(var j=0; j< data.length; j++){
            totalprice = totalprice + data[j].price*data[j].quantity;
        }
        console.log(totalprice);

        db('orders').insert({
            sessionid: sessionId,
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            addinfor: addinfor,
            totalprice: totalprice
        }).then(data2 => {
            // db('sessions')
            // .where('sessionid', '=', sessionId)
            // .del()
            // .then(data => {
            //     console.log('Delete '+sessionId+' from sessions');
            // })
            // res.clearCookie('sessionId');
            res.redirect('/');
            //console.log(data2);
        })
    })
}