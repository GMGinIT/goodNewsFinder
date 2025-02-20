"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Favorites",
      [
        {
          userId: 1,
          newsId: "news-123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          newsId: "news-456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          newsId: "news-789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Favorites", null, {});
  },
};
