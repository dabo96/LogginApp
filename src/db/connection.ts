import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sistemaHotel', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;