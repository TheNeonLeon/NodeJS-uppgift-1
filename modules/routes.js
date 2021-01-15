const db = require('../server');
const uuid4 = require('uuid4');
module.exports = (app, db) => {

//add new Products
const addItem = async (id, name, price, img) => {
    const data = await db.get("product").push({ id, name, price, img }).write();
    return data;
  };
  

  //show all products
  app.get("/product", (req, res) => {
    res.json(db.get("product").value());
  });

  app.post("/product", async (req, res) => {
    const { id, name, price, img } = req.query;
    const data = await addItem(id, name, price, img);
  });
  
  //add to cart
  
  const addToCart = async id => {
    const checkCart = await db.get("varukorg").find({ id }).value();
  
    if (checkCart) {
      let message = "";
      return message;
    } else {
      let find = await db.get("product").find({ id }).value();
    if (find) {
        find = await db.get("varukorg").push(find) .write();
        return find;
      } else {
        message = false;
        return message;
      }
    }
  };
  //add product
  app.post("/varukorg", async (req, res) => {
    const { id } = req.query;
    const find = await addToCart(id);
    let message = {
      success: true,
      message: "Product added"
    };
  
    if (typeof find == "string" || find instanceof String) {
      message = {
        success: false,
        message: "product already in cart"
      };
    } else if (find === false) {
      message = {
        success: false,
        message: "product does not exist"
      };
    }message.find = find[find.length - 1];
    return res.send(message);
  });
  //get products from cart
  app.get("/varukorg", (req, res) => {
    res.json(db.get("varukorg").value());
    return res;
  });
  
  //delete Products from cart
  
  const deleteProduct = async id => {
    const checkCart = await db.get("varukorg").find({ id }).value();
  
    if (checkCart) {
      let res = await db.get("varukorg").remove({ id }).write();
      return res;
    } else {
      res = "";
      return res;
    }
  };
  
  app.delete("/varukorg", async (req, res) => {
    const { id } = req.query;
    const find = await deleteProduct(id);
  
    if (typeof find === "string" || find instanceof String) {
      message = {
        success: false,
        message: "product does not exist"
      };
    } else {
      message = {
        success: true,
        message: "Product deleted"
      };
    }message.find = find[res.length - 1];
    return res.send(message);
  });
}
