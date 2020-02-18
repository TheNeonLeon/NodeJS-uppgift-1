const express = require('express');
const app = express();
const low = require('lowdb');
const bodyParser = require('body-parser');
const uuid4 = require('uuid4');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const PORT = process.env.PORT || 8000;
const routes = require('./modules/routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {console.log(`server started on port ${PORT}`)
});


//Setting defaults if JSON is empty

  db.defaults({ product: [], varukorg: [] })
  .write();


routes(app, db);

