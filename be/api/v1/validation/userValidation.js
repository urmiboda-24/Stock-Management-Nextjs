const joiValidator = require("../../utils/joiValidator");
const promise = require("bluebird");
const joi = require("joi");

class UserValidation {
  async signUpRequest(body) {
    try {
      let schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
        full_name: joi.string().required(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async loginRequest(body) {
    try {
      let schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async forgotPasswordRequest(body) {
    try {
      let schema = joi.object().keys({
        email: joi.string().email().required(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async resetPasswordRequest(body) {
    try {
      let schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required(),
        token: joi.string().required(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateMessage(body) {
    try {
      let schema = joi.object().keys({
        sender_id: joi.number().required(),
        receiver_id: joi.number().required(),
        conversation_id: joi.number().optional(),
        message: joi.string().required(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateConversation(body) {
    try {
      let schema = joi.object().keys({
        sender_id: joi.number().required(),
        receiver_id: joi.number().required(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateJoinRoom(body) {
    try {
      let schema = joi.object().keys({
        sender_id: joi.number().required(),
        receiver_id: joi.number().required(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }

  async validateSearchUser(body) {
    try {
      let schema = joi.object().keys({
        user_name: joi.string().required(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }

  async validateUserInfo(body) {
    try {
      console.log("validation =>", body);
      let schema = joi.object().keys({
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        birthday: joi.any().required(),
        gender: joi.string().required(),
        phone_number: joi.number().required(),
        address: joi.string().required(),
        block_no: joi.string().required(),
        city: joi.string().required(),
        zip: joi.string().required(),
        state: joi.string().required(),
        company_news: joi.any().optional(),
        account_activity: joi.any().optional(),
        meetups: joi.any().optional(),
        profile_pic: joi.any().optional(),
        cover_pic: joi.any().optional(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateUpdateUserInfo(body) {
    try {
      let schema = joi.object().keys({
        first_name: joi.string().optional(),
        last_name: joi.string().optional(),
        birthday: joi.any().optional(),
        gender: joi.string().optional(),
        phone_number: joi.number().optional(),
        address: joi.string().optional(),
        block_no: joi.string().optional(),
        city: joi.string().optional(),
        state: joi.string().optional(),
        company_news: joi.any().optional(),
        account_activity: joi.any().optional(),
        meetups: joi.any().optional(),
        profile_pic: joi.any().optional(),
        cover_pic: joi.any().optional(),
        zip: joi.number().required(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateNotification(body) {
    try {
      let schema = joi
        .object()
        .keys({
          user_id: joi.optional(),
          company_news: joi.any().optional(),
          account_activity: joi.any().optional(),
          meetups: joi.any().optional(),
        })
        .or("company_news", "account_activity", "meetups");
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
}
module.exports = new UserValidation();
