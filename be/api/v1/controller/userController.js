const codeHelper = require("../../utils/codeHelper");
const db = require("../../utils/db");
const passwordHelper = require("../../utils/passwordHelper");
const responseHelper = require("../../utils/responseHelper");
const UserService = require("../services/userService");
const UserValidation = require("../validation/userValidation");

class UserController {
  async getAllUsers(req, res) {
    try {
      const result = await db.select("users", "*");
      responseHelper.success(res, "SUCCESS", result);
    } catch (error) {
      console.log(error);
      responseHelper.error("res", error);
    }
  }
  async signUp(req, res) {
    try {
      if (req.body.email) {
        req.body.email = req.body.email.trim();
        req.body.email = req.body.email.toLowerCase();
      }
      if (req.body.full_name) {
        req.body.full_name = req.body.full_name.trim();
      }
      await UserValidation.signUpRequest(req.body);
      const data = await UserService.isEmailExits(req.body.email);
      if (data) {
        throw "EMAIL_ALREADY_EXITS";
      }
      await UserService.createUser(req.body);
      responseHelper.success(res, "USER_CREATED");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async login(req, res) {
    try {
      if (req.body.email) {
        req.body.email = req.body.email.trim();
        req.body.email = req.body.email.toLowerCase();
      }
      // if (req.path === "/adminLogin") {
      //   if (req.body.email !== "admin@gmail.com") {
      //     throw "ONLY_ADMIN";
      //   }
      // }
      // if (req.path === "/signIn") {
      //   if (req.body.email === "admin@gmail.com") {
      //     throw "ONLY_USER";
      //   }
      // }
      await UserValidation.loginRequest(req.body);
      const data = await UserService.isEmailExits(req.body.email);
      if (!data) {
        throw "USER_WITH_EMAIL_NOT_FOUND";
      }
      await passwordHelper.checkPassword(req.body.password, data[0].password);
      const token = await codeHelper.getJwtToken(data[0].id);
      delete data[0].password;
      responseHelper.success(res, "LOGIN_SUCCESS", data, { token });
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async forgotPassword(req, res) {
    try {
      if (req.body.email) {
        req.body.email = req.body.email.trim();
        req.body.email = req.body.email.toLowerCase();
      }
      await UserValidation.forgotPasswordRequest(req.body);
      const data = await UserService.isEmailExits(req.body.email);
      if (!data) {
        throw "USER_WITH_EMAIL_NOT_FOUND";
      }
      const token = await codeHelper.getJwtToken(data[0].id);
      await UserService.forgotPasswordMail(req.body.email, token);
      delete data[0].password;
      responseHelper.success(res, "FORGOT_PASSWORD_SUCCESS", data, { token });
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async resetPassword(req, res) {
    try {
      if (req.body.email) {
        req.body.email = req.body.email.trim();
        req.body.email = req.body.email.toLowerCase();
      }
      await UserValidation.resetPasswordRequest(req.body);
      const decodeToken = await codeHelper.decodeToken(req.body.token);
      console.log("decodedToken =>", decodeToken.user_id);
      const userData = await UserService.getEmailId(decodeToken.user_id);
      if (userData[0].email === req.body.email) {
        const data = await UserService.updatePassword(
          decodeToken.user_id,
          req.body
        );
        responseHelper.success(res, "PASSWORD_CHANGE_SUCCESSFUL", data);
      } else {
        throw "EMAIL_DID_NOT_FOUND";
      }
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async addUserInfo(req, res) {
    try {
      // console.log("req.body=>", req.files);
      await UserValidation.validateUserInfo(req.body);
      // await UserService.checkPhoneNumberExits(req.body, req.user_id);
      await UserService.addUserInfo(req.body, req.user_id);
      responseHelper.success(res, "SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async updateProfilePic(req, res) {
    try {
      console.log("test");
      if (!req.file) {
        throw "PLEASE_UPLOAD_IMAGE";
      }
      await UserService.uploadProfilePic(req.user_id, req.file);
      responseHelper.success(res, "SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async updateCoverPic(req, res) {
    try {
      if (!req.file) {
        throw "PLEASE_UPLOAD_IMAGE";
      }
      await UserService.uploadCoverPic(req.user_id, req.file);
      responseHelper.success(res, "SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async updateUserInfo(req, res) {
    try {
      await UserValidation.validateUpdateUserInfo(req.body);
      await UserService.checkPhoneNumberExits(req.body, req.user_id);
      await UserService.updateUserInfo(req.body, req.user_id);
      responseHelper.success(res, "SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async getUserDetail(req, res) {
    try {
      const data = await UserService.getUserInfo(req.user_id);
      responseHelper.success(res, "SUCCESS", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async getAllUser(req, res) {
    try {
      const data = await UserService.getAllUser(req.body);
      responseHelper.success(res, "SUCCESS", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async addNewMessage(req, res) {
    try {
      await UserValidation.validateMessage(req.body);
      const data = await UserService.addNewMessage(req.body);
      responseHelper.success(res, "SUCCESS", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async getConversation(req, res) {
    try {
      await UserValidation.validateConversation(req.body);
      const data = await UserService.getConversation(req.body);
      responseHelper.success(res, "SUCCESS", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async joinRoom(req, res) {
    try {
      await UserValidation.validateJoinRoom(req.body);
      const data = await UserService.joinRoom(req.body);
      responseHelper.success(res, "SUCCESS", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async searchUser(req, res) {
    try {
      await UserValidation.validateSearchUser(req.body);
      const data = await UserService.searchUser(req.body);
      responseHelper.success(res, "SUCCESS", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async getUserProfile(req, res) {
    try {
      const data = await UserService.getUserProfile(req.user_id);
      responseHelper.success(res, "", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async updateNotificationStatus(req, res) {
    try {
      await UserValidation.validateNotification(req.body);
      await UserService.updateNotificationStatus(req.body, req.user_id);
      responseHelper.success(res, "");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
}

module.exports = new UserController();
