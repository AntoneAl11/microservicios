const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Acepta solicitudes desde tu aplicación React
    methods: ["GET", "POST"],
    credentials: true
  }
});
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Usa el middleware CORS en Express
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

subscriber.subscribe('chat');

subscriber.on('message', (channel, message) => {
  if (channel === 'chat') {
    console.log('Received message from Redis:', message);
    io.emit('chat message', message);
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Received message from client:', msg);
    publisher.publish('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Chat service is running');
});

server.listen(3001, () => {
  console.log('Chat service listening on *:3001');
});
