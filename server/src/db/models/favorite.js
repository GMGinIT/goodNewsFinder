const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }

  Favorite.init(
    {
      userId: DataTypes.INTEGER,
      newsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );

  return Favorite;
};
