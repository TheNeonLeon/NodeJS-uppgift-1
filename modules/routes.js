const db = require('../server');
const uuid4 = require('uuid4');

module.exports = (app, db) => {
    var id = uuid4();
    var productList = (
    { 
        id: id, 
        name: "clock", 
        price: "500 $", 
        URL: "https://placeimg.com/640/480/tech"
    },
    {
        id: id, 
        name: "tie", 
        price: "200 $", 
        URL: "https://placeimg.com/640/480/tech"
    },

    {
        id: id, 
        name: "shoe", 
        price: "50 $", 
        URL: "https://placeimg.com/640/480/tech"
    }
    
);
    const found = (id) => db.get('product').find(x => x.id).value();
//Get all products
    app.get('/product/all', (req, res, next) =>{
        res.json(db);
        next();
    });

    app.get('/', (req, res, next) =>{
        res.json(db.get('product')
        .value());
        
        next();
    });

    app.get('/product', (req, res, next) =>{
        res.json(db.get('product')
        .value());
        
        next();
    });

//Add product to cart
app.post('/varukorg', (req, res, next) =>{
    const korg = db.get('varukorg').value();
    const products = db.get('product').value();
    let error = {
        status: 'Error',
        message: 'Your product is already in the cart'
    }
    let success = {
        status: 'Success',
        message: 'Product added to cart'
    }
    function checkCart() {
        if(!Array.isArray(korg) || !korg.length) {
            db.get('varukorg').push(products).write();
            res.send(success);
        }else{
            res.send(error);
        }
        next();
        return
    }
    checkCart();
});

//Getting all products from cart
    app.get('/varukorg', (req, res) => {
        res.json(db.get('varukorg')
        .value());          
        });
        
//Delete product from cart
    app.delete('/varukorg', (req, res) =>{
       let korg = db.get('varukorg').value();
    function checkDeleted() {
        if(!Array.isArray(korg) || !korg.length){
            res.send('You cannot delete a product that does not exist');
            return;
        }
        else{
            db.get('varukorg').pop(found).write();
            res.send('Product deleted')
            return;
        }
    }
    checkDeleted();
    });
}
