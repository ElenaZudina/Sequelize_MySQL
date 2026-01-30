const express = require('express');
const path = require('path');
const sequelize = require('./db/connection.js');
const Cheese = require('./db/models/cheese.js');

const app = express();
const PORT = 3002;

//Middleware для обсулуживания статических файлов
app.use(express.static(path.join(__dirname, 'public')));

//API эндпойнт для получения списка сыров
app.get('/api/cheeses', async (req, res) => {
    try {
        const cheeses = await Cheese.findAll();
        res.json(cheeses);
    } catch (error) {
        console.error('Ошибка при получении сыров:', error);
        res.status(500).send('Ошибка сервера');
    }
});

//Функция для инициализации и запуска сервера
const startServer = async () => {
    try {
        //Синхронизация моделей с БД. { force: true } пересоздаст таблицы при каждом запуске
        await sequelize.sync({ force: true });
        console.log('Таблицы успешно созданы.');

        //Загрузка тестовых данных
        await Cheese.bulkCreate([
            { name: 'Пармезан', origin: 'Италия', price: 25.99, imageUrl: '/images/parmesan.jpg', description: 'Твердый итальянский сыр с насыщенным вкусом и ароматом.', category: 'твердый' },
            { name: 'Бри', origin: 'Франция', price: 19.50, imageUrl: '/images/brie.jpg', description: 'Мягкий сыр с белой плесенью и нежным кремовым вкусом.', category: 'мягкий' },
            { name: 'Чеддер', origin: 'Англия', price: 15.00, imageUrl: '/images/cheddar.jpg', description: 'Полутвердый сыр с острым, слегка пикантным вкусом.', category: 'полутвердый' },
            { name: 'Гауда', origin: 'Нидерланды', price: 18.75, imageUrl: '/images/gouda.jpg', description: 'Полутвердый сыр с мягким сливочным вкусом.', category: 'полутвердый' },
            { name: 'Рокфор', origin: 'Франция', price: 30.00, imageUrl: '/images/roquefort.jpg', description: 'Синий сыр с насыщенным и острым вкусом.', category: 'с плесенью' },
            { name: 'Моцарелла', origin: 'Италия', price: 12.00, imageUrl: '/images/mozzarella.jpg', description: 'Свежий мягкий сыр, отлично подходит для салатов и пиццы.', category: 'мягкий' }
            ]);

        console.log('Тестовые данные успешно загружены.');

        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Не удалось запустить сервер:', error);
    }
};

startServer();
