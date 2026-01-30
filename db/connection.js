const { Sequelize } = require('sequelize');

//Создаем подключение к MySQL
const sequelize = new Sequelize('cheeses_shop_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//Проверка соединения с базой данных
const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой данных успешно установлено.');
    } catch (error) {
        console.error('Не удалось установить соединение с базой данных:', error);
    }
};

checkConnection();

module.exports = sequelize;
