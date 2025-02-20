const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Favorite }) {
      this.hasMany(Favorite, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      goodTags: DataTypes.ARRAY(DataTypes.STRING),
      badTags: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
