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

// Veritabanı bağlantısını test edin
sequelize.authenticate()
    .then(() => {
        console.log('Veritabanına başarıyla bağlanıldı.');

        // Tabloları veritabanına senkronize edin
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Veritabanı ve tablolar senkronize edildi.');

        // Sunucuyu başlatın
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Veritabanı bağlantısı veya senkronizasyon hatası:', err);
    });

// Rotalar burada eklenecek
