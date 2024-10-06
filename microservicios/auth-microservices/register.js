const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).send({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).send({ message: 'Registration failed', error });
  }
});

// Ruta básica para verificar el servidor
app.get('/', (req, res) => {
  res.send('Register service is running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Register service running on port ${PORT}`);
});
