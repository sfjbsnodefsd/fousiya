const { createUser,
     deleteUser, 
     getUserById,
      getUsers, 
      updateUser,
      login 
    } = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation")

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/", updateUser);
router.delete("/", deleteUser)
router.post("/login", login)

module.exports = router;