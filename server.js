const express = require('express');
const app = express();
const cors = require('cors')
const low = require('lowdb');
const bodyParser = require('body-parser');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const PORT = process.env.PORT || 8000;
const routes = require('./modules/routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())




//Setting defaults if JSON is empty
const startDb = () => {
  const product = db.has('product').value();
  const cart = db.has('varukorg').value();
  if(!product) {
  db.defaults({ product: [], varukorg: [] })
  .write();
  }
  if(!cart) {
    db.defaults({ product: [], varukorg: [] })
  }
}

app.listen(PORT, () => {console.log(`server started on port ${PORT}`);
startDb();
});

routes(app, db);

