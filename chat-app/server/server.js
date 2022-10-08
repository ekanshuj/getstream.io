const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes')
dotenv.config({ path: './config/config.env' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Hello - Chat Application')
});



app.listen(PORT, () => console.log(`${PORT}`));