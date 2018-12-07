const db = require('../../model/model');
const bcrypt = require('bcrypt-nodejs');


module.exports.signin = (req, res) => {
    res.render('page/signin');
};

module.exports.postSignin = (req, res) => {
    const { email, password } = req.body;
    db.select('email', 'hash','id').from('login')
        .where('email', '=', email)
        .then(data => {
            if (data.length == 0) {
                res.render('page/signin', {
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
                    res.redirect('/');
                
                } else {
                    //res.status(400).json('wrong credentials');
                    res.render('page/signin', {
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

module.exports.createUser = (req, res) => {
    const { name, email, password, entries } = req.body;
    console.log(name, email, password, entries);
    const hash = bcrypt.hashSync(password);
    console.log(name, email, hash);

    db('login').insert({
        email: email,
        hash: hash
    }).then(data => {
        db('users').insert({
            name: name,
            email: email,
            entries: entries,
            joined: new Date()
        })
        .then(data2 => {
            res.redirect('/signin');
        })
    })
}