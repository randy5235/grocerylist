import Sequelize, {Optional} from 'sequelize';

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  isRegistered: boolean;
}
export type UserCreationAttributes = Optional<UserAttributes, 'id'>;


export const UserSchema = {
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
};