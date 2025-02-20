const { User } = require('../db/models');
class UserService {
  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async create(userData) {
    console.log('>>>>>>>>>>>>', userData)
    return await User.create(userData);
  }
}

module.exports = UserService;
