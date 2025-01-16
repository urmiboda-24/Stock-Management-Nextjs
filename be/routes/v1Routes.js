let express = require("express");
const userController = require("../api/v1/controller/userController");
let router = express.Router();
const headerValidator = require("../api/utils/headerValidator");
const stockController = require("../api/v1/controller/stockController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.login);
router.post("/adminLogin", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);
// router.use(headerValidator.authValidation);
router.get(
  "/getUserProfile",
  headerValidator.authValidation,
  userController.getUserProfile
);
router.get(
  "/getStocks",
  headerValidator.authValidation,
  stockController.getAllStock
);
router.post(
  "/getStockById",
  headerValidator.authValidation,
  stockController.getStockById
);
router.post(
  "/addNewStock",
  headerValidator.authValidation,
  stockController.addStock
);
router.post(
  "/editStock",
  headerValidator.authValidation,
  stockController.editStock
);
router.post(
  "/deletePost",
  headerValidator.authValidation,
  stockController.deleteStock
);
router.post(
  "/addUserInfo",
  headerValidator.authValidation,
  userController.addUserInfo
);

router.post(
  "/updateProfilePic",
  upload.single("image1"),
  headerValidator.authValidation,
  userController.updateProfilePic
);
router.post(
  "/updateCoverPic",
  upload.single("image2"),
  headerValidator.authValidation,
  userController.updateCoverPic
);
router.post(
  "/updateUserInfo",
  headerValidator.authValidation,
  userController.updateUserInfo
);
router.get(
  "/getUserInfo",
  headerValidator.authValidation,
  userController.getUserDetail
);

router.post(
  "/updateNotificationStatus",
  userController.updateNotificationStatus
);

router.post(
  "/deleteMultipleStocks",
  headerValidator.authValidation,
  stockController.deleteMultipleStocks
);
router.get(
  "/getRandomStock",
  headerValidator.authValidation,
  stockController.getRandomStock
);
router.get(
  "/getPortfolio",
  headerValidator.authValidation,
  stockController.getPortfolio
);

router.post(
  "/addStockToPortfolio",
  headerValidator.authValidation,
  stockController.addStockToPortfolio
);

router.get(
  "/getStockForPortfolio",
  headerValidator.authValidation,
  stockController.getStockForPortfolio
);

router.post(
  "/sellStock",
  headerValidator.authValidation,
  stockController.sellStock
);

router.post(
  "/transaction",
  headerValidator.authValidation,
  stockController.transaction
);

router.post(
  "/getTransaction",
  headerValidator.authValidation,
  stockController.getTransaction
);

router.post(
  "/editTransaction",
  headerValidator.authValidation,
  stockController.editTransaction
);

router.post(
  "/deleteTransaction",
  headerValidator.authValidation,
  stockController.deleteTransaction
);

module.exports = router;
