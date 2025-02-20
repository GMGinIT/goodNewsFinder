"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPasswordUser1 = await bcrypt.hash("Password1!", 10);
    const hashedPasswordUser2 = await bcrypt.hash("Password2!", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "user1",
          email: "user1@example.com",
          password: hashedPasswordUser1,
          goodTags: ["tag1", "tag2"],
          badTags: ["tag3", "tag4"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user2",
          email: "user2@example.com",
          password: hashedPasswordUser2,
          goodTags: ["tag5", "tag6"],
          badTags: ["tag7", "tag8"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
