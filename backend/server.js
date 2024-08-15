require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/db');

// Rota dosyalarını içe aktarın
const productRoutes = require('./routes/productRoutes');
// Diğer rota dosyalarını buraya ekleyin...

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP isteklerini loglar

// Ana Rota (Health Check)
app.get('/', (req, res) => {
    res.send('Cafe POS Backend Running');
});

// API Rotaları
app.use('/api/products', productRoutes);
// Diğer rotalarınızı buraya ekleyin...

// Veritabanı bağlantısını test edin ve sunucuyu başlatın
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
        console.error('Veritabanı bağlantısı veya senkronizasyon hatası:', err.message, err.stack);
    });
