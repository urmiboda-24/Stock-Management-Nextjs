var express = require("express");
const userController = require("../api/v1/controller/userController");
var router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/users", userController.getAllUsers);

module.exports = router;
