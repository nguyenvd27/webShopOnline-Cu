const db = require('../../../model/model');
const bcrypt = require('bcrypt-nodejs');


module.exports.signin = (req, res) => {
    res.render('admin/adminPage/adminSignin');
};

module.exports.postSignin = (req, res) => {
    const { email, password } = req.body;
    db.select('email', 'hash','id').from('login')
        .where('email', '=', email)
        .then(data => {
            if (data.length == 0) {
                res.render('admin/adminPage/adminSignin', {
                    errors: [
                        'User does not exist'
                    ],
                    values: req.body
                });
                return;
            } else {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                console.log(isValid);
                if (isValid) {
                    res.cookie('email', email,{
                        signed: true
                    });
                    res.redirect('/admin/products');
                
                } else {
                    //res.status(400).json('wrong credentials');
                    res.render('admin/adminPage/adminSignin', {
                        errors: [
                            'Wrong password'
                        ],
                        values: req.body
                    });
                    return;
                }
            }
        })
};