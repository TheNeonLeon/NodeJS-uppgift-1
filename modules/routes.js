const db = require('../server');
const uuid4 = require('uuid4');
const { empty } = require('uuidv4');

module.exports = (app, db) => {
    var id = uuid4();
    var productList = ({ id: id, name: "clock", price: "500 $", URL: "https://placeimg.com/640/480/tech"});
    const found = (id) => db.get('varukorg').find({id:id}).value();
//Get all products
    app.get('/product', (req, res, next) =>{
        res.json(db);
        next();
    });

     /* function checkCart(){
      if(JSON.stringify(Object.keys(korg)).length === 0){
        db.get('varukorg').push(found).write();
        res.send('added');
    }else{
        res.send('You cannot add the same product');
    }
  }
  checkCart(); */
//Add product to cart
app.post('/varukorg', (req, res, next) =>{
    const korg = db.get('varukorg').value();

    let prodSend = req.query;
    let error = {
        status: 'Error',
        message: 'Your product is already in the cart'
    }
    let success = {
        status: 'Success',
        message: 'Product added to cart'
    }
    function checkCart() {
        if(found != undefined) {
            db.get('varukorg').push(productList).write();
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
            res.send('DELETED')
            return;
        }
        next();
    }
    checkDeleted();
    });
}



 /*app.get('/varukorg/:id', (req, res) => {
            const id = req.params.id;
            
            for (let varukorg of db) {
                if (varukorg.id === id){
                    res.json(varukorg);
                    return;
                }
            }
           res.status(404).send('Product not found');
        });*/
