const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(400).send({ message: 'Login failed' });
    }
  } catch (error) {
    res.status(400).send({ message: 'Login failed', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Login service running on port ${PORT}`);
});
