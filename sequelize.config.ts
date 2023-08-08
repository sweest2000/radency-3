// sequelize.config.ts
import { SequelizeOptions } from 'sequelize-typescript';
import { Notes } from 'src/notes/notes.dto';
import { Stats } from 'src/notes/stats/stats.dto';

const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres', // Specify the database dialect (postgres in this case)
  host: 'postgres', // Replace with your PostgreSQL database host
  port: 5432, // Replace with your PostgreSQL database port
  username: 'admin', // Replace with your PostgreSQL database username
  password: 'admin', // Replace with your PostgreSQL database password
  database: 'notes_db', // Replace with your PostgreSQL database name
  models: [Notes, Stats] // We'll define the models later, leave it as an empty array for now
};

export default sequelizeConfig;
