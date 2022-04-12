const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Follow extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    user_follow: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    forum_follow: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'forum',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'follow',
  }
);

module.exports = Follow;