const express = require("express");
const router = express.Router();

const AuthController = require("./controllers/AuthController");
const AdsController = require("./controllers/AdsController");
const UserController = require("./controllers/UserController");
const Auth = require("./middlewares/Auth");
const AuthValidator = require('./validators/AuthValidator')

router.get("/states", Auth.private, UserController.getStates);

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

router.post("/user/signin", AuthController.signin);
router.post("/user/signup", AuthValidator.signup, AuthController.signup);

router.get("/user/me", Auth.private, UserController.info);
router.put("/user/me", Auth.private, UserController.editAction);

router.get("/categories", AdsController.getCategories);

router.post("/ad/add", Auth.private, AdsController.addAction);
router.get("/ad/list", AdsController.getList);
router.get("/ad/item", AdsController.getItem);
router.post("/ad/:id", Auth.private, AdsController.editAction);

module.exports = router;
