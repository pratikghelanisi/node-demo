const express = require('express')
const router = express.Router();
const User = require('.././Controller/UserController');
const Setting= require('.././Controller/SettingsController');
const Cart= require('.././Controller/CartController');
const Product= require('.././Controller/ProductController');
const Demo= require('.././Controller/Demo');
const Subscribe= require('.././Controller/EmailController');
const Order = require('.././Controller/OrderController');
const Dashboard = require('.././Controller/DashboardController');

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        var ext = file.mimetype.split('/')[1];
        cb(null, Date.now() + "." + ext);
    }
});

const upload = multer({ storage: storage });

// User routes
router.post('/user-registration',User.registration);
router.get('/userlist',User.userlist);
router.get('/user',User.user);
router.get('/user-login',User.userlogin);
router.post('/updat-settings',Setting.UpdateSetting);

// Cart
router.post('/addtocart',Cart.Addtocart);
router.get('/cartlist',Cart.cartlist);
router.delete('/deletecartitem',Cart.deleteitem);

// Product
router.post('/add-product',upload.array('files'),Product.AddtoProduct);
router.get('/productlist',Product.productlist);
router.get('/pricefilter',Product.pricefilter);
router.get('/search',Product.search);

//Email 
router.post('/subscribe',Subscribe.subscribe);

//Order
router.post('/order',Order.addOrder);

//Dashboard
router.get('/dashboard',Dashboard.Dashboard);

router.get('/test',Dashboard.test);
module.exports = router;