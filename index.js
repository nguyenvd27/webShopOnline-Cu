const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const signinRoute = require('./routes/signin/signin.route');
const getProducts = require('./routes/index.route');
const productDetails = require('./routes/productDetails/productDetail.route');
const cart = require('./routes/cart/cart.route');
const register = require('./routes/register/register.route');
const products = require('./routes/products/product.route');
const contact = require('./routes/contact/contact.route');
const user = require('./routes/user/user.route');

const adminSignin = require('./routes/admin/adminSignin/adminSignin.route');
const adminProduct = require('./routes/admin/adminProducts/adminProducts.route');
const adminUser = require('./routes/admin/adminUsers/adminUsers.route');
const adminOrder = require('./routes/admin/adminOrders/adminOrders.route');
const adminCarousel = require('./routes/admin/adminCarousels/adminCarousels.route');

const sessionMiddleware = require('./middlewares/session.middleware');
const middle = require('./middlewares/auth.middleware');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('chuoibatky'));
app.use(sessionMiddleware);

app.use('/signin', signinRoute);
app.use('/', getProducts);
app.use('/product-details', productDetails);
app.use('/cart', cart)
app.use('/register', register);
app.use('/products', products);
app.use('/contact', contact);
app.use('/user', user);

app.use('/admin/signin', adminSignin);
app.use('/admin/products',middle.adminAuth, adminProduct);
app.use('/admin/users', middle.adminAuth,adminUser);
app.use('/admin/orders', middle.adminAuth, adminOrder);
app.use('/admin/carousels', middle.adminAuth, adminCarousel);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))