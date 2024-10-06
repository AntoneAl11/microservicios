const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Aquí iría la lógica de registro, como almacenar el usuario en una base de datos.
  res.status(200).send({ message: 'Registration successful' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Register service running on port ${PORT}`);
});
