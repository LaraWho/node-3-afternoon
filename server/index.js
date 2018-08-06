const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');

const swag =require('./models/swag');
const app = express();

const swagCntrl = require('./controllers/swag_controller');
const authCntrl = require('./controllers/auth_controller');
const cartCntrl = require('./controllers/cart_controller');
const searchCntrl = require('./controllers/search_controller');

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkForSession);
app.use(express.static( `${__dirname}/build`));

app.get('/api/swag', swagCntrl.read);

app.post('/api/login', authCntrl.login);
app.post('/api/register', authCntrl.register);
app.post('/api/signout', authCntrl.signOut);
app.get('/api/user', authCntrl.getUser);

app.post('/api/cart', cartCntrl.add);
app.post('/api/checkout', cartCntrl.checkout);
app.delete('/api/cart', cartCntrl.remove);

app.get('/api/search', searchCntrl.search);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}.`)})