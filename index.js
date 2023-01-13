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

io.on('connection', async (socket) => {
  try {
    let Messages = await MessageController.getMessages({})
    Messages.map(msg=>{
      io.emit('chat message', msg);
    })

    io.emit('chat message', Messages);
  } catch (error) {
    
  }

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});