const app = require('express')();
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.enable('trust proxy');
router(app);

// app.use(function(err, req, res, next) {
//   console.log('error');
//   res.status(500);
//   res.render('error', { error: err });
// });

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Always be listening on ',port)