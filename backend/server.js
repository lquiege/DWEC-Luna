const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const rutas = require('./routes');
const port = process.env.PORT || "3000";
const cors = require('cors');
const sequelize = require('./database');
//const game = require('./game.model');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.send("eeeeddddy");
});

app.use('/api', rutas);

sequelize.sync().then(result => {
    //  console.log(result);
    app.listen(port);
}).catch(err => console.log(err));