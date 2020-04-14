const db = require('../server');
const uuid4 = require('uuid4');
const bodyParser = require('body-parser');



module.exports = (app, db) => {
    var id = uuid4();
    var productList = ({ id: id, name: "clock", price: "500 $", URL: "https://placeimg.com/640/480/tech"});
    

//Get all products
    app.get('/product', (req, res) =>{
        res.json(db);
    });
//Adding new product to cart
    app.post('/product/add', (req, res) =>{
        const korg = db.get('varukorg').value();
        const fail = "";
        const found = db.get('product').find(function(id){
            if (db.found(req.body.id)){

                return found;
        
               }else if (!found){
                   return fail;
               }
            return id;

            
        });
        const addProduct = db.get('varukorg').push(found).write();

       res.send('Products added');
    });

app.post('/varukorg', (req, res) =>{
    const korg = db.get('varukorg').value();
    const addProduct = db.get('varukorg').push(found).write();

    const found = db.get('varukorg').find(function(id){
        return id;
    });
    if (typeof addProduct == "string"){

        res.send('Du kan ej lägga till samma produkt'); 
          
    }
    if (!found){
        db.get('produkt').push(addProduct);
        res.send('Du kan inte lägga till en produkt some inte finns');
        
    }
    
    
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
        
        db.get('varukorg').pop(found).write();

        res.send('DELETED')

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
