const { User } = require('../db/models');
const sequelize = require('sequelize');

class UserService {
  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async create(userData) {
    console.log('>>>>>>>>>>>>', userData);
    return await User.create(userData);
  }

  static async addGoodTag(goodTag, userId) {
    return await User.update(
      {
        goodTags: sequelize.fn(
          'array_append',
          sequelize.col('goodTags'),
          goodTag
        ),
      },
      { where: { id: userId } }
    );
  }

  static async addBadTag(badTag, userId) {
    return await User.update(
      {
        badTags: sequelize.fn(
          'array_append',
          sequelize.col('badTags'),
          badTag
        ),
      },
      { where: { id: userId } }
    );
  }

}

module.exports = UserService;
