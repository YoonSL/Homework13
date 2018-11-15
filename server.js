const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

var db = require("./data");

require('./sockets/todo-sockets')(io);
require('./routes/api-routes')(app);

db.sequelize.sync().then(function(){
    server.listen(PORT, ()=>{
        console.log(`App running on port ${PORT}`);
    });
})
