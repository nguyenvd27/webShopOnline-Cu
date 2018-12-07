const db = require('../../../model/model');

module.exports.order = (req, res ) => {
    db.select().from('orders')
    .then(data => {
        res.render('admin/adminPage/adminOrders',{
            orders: data
        });
    })
}

//Tao them bang order_detail 
module.exports.orderView = (req, res) => {
    var idDelete = req.body.idDelete;
    // db('users')
    // .where('id', '=', idDelete)
    // .returning('*')
    // .del()
    // .then(data => {
    //     if(data.length ===0){
    //         res.redirect('/admin/users');
    //     }else{
    //         //console.log(data);
    //         db('login')
    //         .where('email', '=', data[0].email)
    //         .del()
    //         .then(data => {
    //             res.redirect('/admin/users');
    //         })
    //     }
    // })
    var id = req.params.id;
    db.select().from('orders')
    .where('id','=', id)
    .then(data => {
        console.log(data);
        res.render('admin/adminPage/adminOrderView',{
            order: data
        });
    })
}