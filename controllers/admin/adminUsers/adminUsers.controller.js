const db = require('../../../model/model');

module.exports.users = (req, res ) => {
    db.select().from('users')
    .then(data => {
        res.render('admin/adminPage/adminUsers',{
            users: data
        });
    })
}

module.exports.delete = (req, res) => {
    var idDelete = req.body.idDelete;
    db('users')
    .where('id', '=', idDelete)
    .returning('*')
    .del()
    .then(data => {
        if(data.length ===0){
            res.redirect('/admin/users');
        }else{
            //console.log(data);
            db('login')
            .where('email', '=', data[0].email)
            .del()
            .then(data => {
                res.redirect('/admin/users');
            })
        }
    })
}