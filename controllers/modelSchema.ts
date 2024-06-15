import { dbConfig } from '../config/dbConfig';
const { Sequelize } = require('sequelize');
import type { ModelDefined, Optional } from 'sequelize';
import winston from 'winston';

winston.level = 'debug';
winston.add(new winston.transports.File({
  filename: `./logs/${new Date().toISOString()}.log`,
  level: 'verbose'
}));

const sequelize = new Sequelize(dbConfig.url);

const List = sequelize.define('lists', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

const Item = sequelize.define('items', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  isDone: {
    type: Sequelize.BOOLEAN
  }
});

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  isRegistered: boolean;
}
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  isRegistered: {
    type: Sequelize.BOOLEAN
  }
});
User.belongsToMany(List, { through: 'UserList' });
List.belongsToMany(User, { through: 'UserList' });

Item.belongsTo(List, { foreignKeyConstraint: true, foreignKey: 'listId' });
List.hasMany(Item);

// force: true will drop the table if it already exists
sequelize.sync({ force: false }).catch(() => {
  winston.log('error', 'unable to sync database');
});

export { User, List, Item };