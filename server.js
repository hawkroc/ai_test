//server.js
'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var  Product = require('./model/products');
var app = express();
var router = express.Router();

var port = 3001;

//mongoose.connect('mongodb://<DBUSERNAME>:<DBPASSWORD>@ds019836.mlab.com:19836/bryandb');
//mongoose.connect('mongodb://testMongodb:test@ds123312.mlab.com:23312/ai_test');
mongoose.connect('mongodb://localhost:27017/ai_test')
//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
//test api
router.get('/', (req, res)=> {
  res.json({ message: 'API success!'});
});

//adding the /product route 
router.route('/product')
  //get all products 
  .get((req, res)=> {
    Product.find((err, products) => {
    if (err) {
        return res.send(err);
    }  
      res.json(products)
    });
  })
  //post new product 
  .post((req, res) =>{
    let product = new Product();
    (req.body.name) ? product.name = req.body.name : null;
    (req.body.text) ? product.text = req.body.text : null;

    product.save((err) =>{
    if (err) {
        return res.send(err);
    }

     // res.set("id", product["_id"]);
      res.json(product);
     // res.json({ message: 'product successfully added!' });
    });
  });

//search api
router.route('/search/:keyword')

  .get((req, res) =>{

    let keyword =req.params.keyword;
   
    //"name" : { $regex: /Ghost/, $options: 'i' }
    Product.find({ "name" :{ $regex: keyword, $options: 'i' }},(err, products)=> {
    if (err) {
        return res.send(err);
    }
      res.json(products)
    });
  });

router.route('/product/:product_id')
  .put((req, res) =>{
    Product.findById(req.params.product_id, (err, product)=> {
    if (err) {
        return res.send(err);
    }    
      //setting the new products
      (req.body.name) ? product.name = req.body.name : null;
      (req.body.text) ? product.text = req.body.text : null;
      //save 
      product.save((err)=> {
      if (err) {
        return res.send(err);
    }  
        res.json(product);
      });
    });
  })
  //delete 
  .delete((req, res)=> {

    Product.remove({ _id: req.params.product_id }, (err, product) =>{
     
 if (err) {
  console.log(''+err);
        return res.send(err);
    }

      res.json({ message: 'product has been deleted' })
    })
  });

app.use('/api', router);


app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
