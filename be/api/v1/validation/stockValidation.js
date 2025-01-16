const joiValidator = require("../../utils/joiValidator");
const promise = require("bluebird");
const joi = require("joi");

class StockValidation {
  async validateAddStock(body) {
    try {
      let schema = joi.object().keys({
        name: joi.string().required(),
        current_price: joi.required(),
        opening_price: joi.optional(),
        closing_price: joi.optional(),
        high_price: joi.optional(),
        low_price: joi.optional(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateEditStock(body) {
    try {
      let schema = joi.object().keys({
        id: joi.number().required(),
        name: joi.string().optional(),
        current_price: joi.optional(),
        opening_price: joi.optional(),
        closing_price: joi.optional(),
        high_price: joi.optional(),
        low_price: joi.optional(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateStockId(body) {
    try {
      let schema = joi.object().keys({
        id: joi.number().required(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateMultipleStockId(body) {
    try {
      let schema = joi.object().keys({
        id: joi.any().required(),
        user_id: joi.optional(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateAddStockToPortfolio(body) {
    try {
      let schema = joi.object().keys({
        user_id: joi.optional(),
        buy_at: joi.number().required(),
        quantity: joi.number().required(),
        stock_id: joi.number().required(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  async validateSellStock(body) {
    try {
      let schema = joi.object().keys({
        user_id: joi.optional(),
        id: joi.number().required(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
  
  async validateEditTransaction(body) {
    try {
      let schema = joi.object().keys({
        user_id: joi.optional(),
        id: joi.number().required(),
        title: joi.string().required(),
        issueDate:joi.optional(),
        dueDate:joi.optional(),
        total: joi.optional(),
        status: joi.string().required(),
      });
      await joiValidator.validateJoiSchema(body, schema);
    } catch (error) {
      return promise.reject(error);
    }
  }
}

module.exports = new StockValidation();
