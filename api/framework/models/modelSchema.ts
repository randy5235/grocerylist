import { dbConfig } from '../../config/dbConfig';
const { Sequelize } = require('sequelize');
import { UserSchema, UserAttributes, UserCreationAttributes } from './UserSchema';
import { ListSchema } from './ListSchema';
import { ItemSchema } from './ItemSchema';
import type { ModelDefined } from 'sequelize';
import winston from 'winston';

winston.level = 'debug';
winston.add(new winston.transports.File({
  filename: `./logs/${new Date().toISOString()}.log`,
  level: 'verbose'
}));

const sequelize = new Sequelize(dbConfig.url);

const List = sequelize.define('lists', ListSchema);

const Item = sequelize.define('items', ItemSchema);

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define('user', UserSchema);

User.belongsToMany(List, { through: 'user_list' });
List.belongsToMany(User, { through: 'user_list' });

Item.belongsTo(List, { foreignKeyConstraint: true, foreignKey: 'listId' });
List.hasMany(Item);

// force: true will drop the table if it already exists
sequelize.sync({ force: false }).catch(() => {
  winston.log('error', 'unable to sync database');
});

export { User, List, Item };