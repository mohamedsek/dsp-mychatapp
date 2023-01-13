require('dotenv').config()
const { Console } = require('console');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const UserRouter = require("./routes/UserRouter")
const LoginRouter = require('./routes/LoginRouter')

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const MessageController = require('./controllers/MessagesController')
const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");



// connexion DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.on("open", () => {
  console.log('[DataBase] ===> MongoDB is connected!! <=== ')
});


app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static('public'));

app.use("/user", UserRouter)
app.use("/login", LoginRouter)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if(token) {

    jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded) {

      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    })
  } else {
    console.log("refused")
  }
});


io.on('connection', async (socket) => {
  try {
    let Messages = await MessageController.getMessages({})
    Messages.map(msg=>{
      io.emit('chat message', msg);
    })

    io.emit('chat message', Messages);
  } catch (error) {

  }

  socket.on('chat message', (id,msg) => {

    console.log(id, msg)

    // check if socket.decoded.exp --> est dans le passé ;
    // Si dans le passé :
    // créer un evenement
    //currentSocketID = io.socket.connected["socketid"];
    //console.log(currentSocketID)
    // io.to(currentSocketID).emit('disconnect', "byebye");

    const token = socket.handshake.auth.token;
    console.log(token)
    jwt.verify(token,process.env.PRIVATE_KEY, function(err, decoded) {
      console.log("here")
      if (err) {
        socket.to(id).disconnect(true);
        console.log("err")
      } else {
        console.log(msg)
        io.emit('chat message', msg);
        console.log("work")
      }
    })

  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
