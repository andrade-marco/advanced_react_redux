//AUTH - Server starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB setup
mongoose.connect('mongodb://localhost:27017/auth');

//App init
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

//Server setup
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(PORT, function() {
  console.log('Server running on port: ' + PORT);
});
