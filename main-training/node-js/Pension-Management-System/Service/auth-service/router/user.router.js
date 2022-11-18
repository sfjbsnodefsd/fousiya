const { createUser,
    // deleteUser, 
    // getUserById,
    //  getUsers, 
     updateUser,
     login 
   } = require("../controller/user.controller");

   
const router = require("express").Router();
const checkToken = require("../isAuthenticated");


router.post("/register",checkToken,createUser);
// router.get("/",checkToken, getUsers);
// router.get("/:id",checkToken, getUserById);
// router.patch("/",checkToken, updateUser);
// router.delete("/",checkToken, deleteUser)
router.post("/login", login);

module.exports = router;