const { faker } = require("@faker-js/faker/locale/id_ID");
const userRouter = require("express").Router();

userRouter.get("/", (req, res) => {
  const fullName = faker.person.fullName();
  const uniqueFullName = [...new Set(fullName.split(" "))].join(" ");

  res.json({
    name: uniqueFullName,
  });
});

module.exports = userRouter;
