var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var barangRouter = require('./routes/barangRoute');
var transaksiRouter = require('./routes/transaksiRoute');
var app = express();
app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
const swaggerOptions = {
    swaggerDefinition:{
        info: {
            title: 'PAPB API',
            desctiption: "PAPB API Information",
            contact:{
                name: "Raihan Rahman"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis:["./routes/*.js"]
}

const swaggerDocs = require('./swagger.json');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/barang', barangRouter);
app.use('/transaksi', transaksiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
