const db = require('../../../model/model');

module.exports.products = (req, res) => {

    db.select().from('products')
    .then(data => {
        res.render('admin/adminPage/adminProducts',{
            products: data
        });
    })
};

module.exports.create =( req, res) => {
    res.render('admin/adminPage/adminProductCreate');
}

module.exports.postCreate =( req, res) => {
    var errors = [];
    if(!req.body.name){
        errors.push('Name is required.');
    }
    if(!req.body.price){
        errors.push('Price is required.');
    }
    if(errors.length){
        res.render('admin/adminPage/adminProductCreate',{
            errors: errors,
            values: req.body
        });
        return;
    }

    var name = req.body.name;
    var price = req.body.price;
    var desc = req.body.desc;
    var img = req.file.path.split('/').slice(1).join('/');
    db('products').insert({
        name: name,
        price: price,
        img: img,
        description: desc,
    }).then(data => {
        res.redirect('/admin/products');
    })
}

module.exports.postDelete = (req, res) => {
    var idDelete = parseInt(req.body.idDelete);
    console.log('ID: ',idDelete);
    console.log(typeof idDelete);
    db('products')
    .where('id', '=', idDelete)
    .del()
    .then(data => {
        if(data){
            console.log('Deleted');
        }
        
        res.redirect('/admin/products')
    })
}

module.exports.edit = (req, res) => {
    var id = req.params.id;
    db.select().from('products')
    .where('id', '=', req.params.id)
    .then(data => {
        res.render('admin/adminPage/adminProductEdit',{
            product: data[0]
        });
    })
}

module.exports.editUpdate = ( req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var price = req.body.price;
    var desc = req.body.desc;
    if(req.file === undefined){
        img= 0;
    }else{
        var img = req.file.path.split('/').slice(1).join('/');
    }
    if(img === 0){
        db.select().from('products')
        .where('id', '=', id)
        .update({
            name: name,
            price: price,
            description: desc,
        })
        .then(data => {
            res.redirect('/admin/products');
        })
    }else{
        db.select().from('products')
        .where('id', '=', id)
        .update({
            name: name,
            price: price,
            description: desc,
            img: img
        })
        .then(data => {
            res.redirect('/admin/products');
        })
    }
}
