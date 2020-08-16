const db = require('../server');
const uuid4 = require('uuid4');

module.exports = (app, db) => {
    var id = uuid4();
    var productList = ({ id: id, name: "clock", price: "500 $", URL: "https://placeimg.com/640/480/tech"});

//Get all products
    app.get('/product', (req, res) =>{
        res.json(db);
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
const found = () => db.get('varukorg').find(function(id){
    return id;
});
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
        if(found == undefined) {
            res.send(error);
        }else{
            db.get('varukorg').push(productList).write();
            res.send(success);
        }
        next()
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
    const found = db.get('varukorg').find(function(id){
        return (id);
    });
       
    function checkDeleted() {
        if(!found){
            res.send('You cannot delete a product that does not exist');
        }
        else{
            db.get('varukorg').pop(found).write();
            res.send('DELETED')
        }
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
