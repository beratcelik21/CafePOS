require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Cafe POS Backend Running');
});

// Rotalar burada eklenecek

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

sequelize.authenticate().then(() => {
    console.log('Database connected.');
}).catch(err => {
    console.log('Error: ' + err);
});
