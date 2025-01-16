const responseHelper = require("../../utils/responseHelper");
const stockService = require("../services/stockService");
const stockValidation = require("../validation/stockValidation");

class StockController {
  async addStock(req, res) {
    try {
      await stockValidation.validateAddStock(req.body);
      await stockService.addStock(req.body);
      responseHelper.success(res, "STOCK_ADDED");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async getAllStock(req, res) {
    try {
      const data = await stockService.getAllStock();
      responseHelper.success(res, "", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async getStockById(req, res) {
    try {
      await stockValidation.validateStockId(req.body);
      const data = await stockService.getStockById(req.body.id);
      responseHelper.success(res, "", data);
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async deleteStock(req, res) {
    try {
      await stockValidation.validateStockId(req.body);
      await stockService.deleteStock(req.body.id);
      responseHelper.success(res, "DELETE_SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res, error);
    }
  }
  async editStock(req, res) {
    try {
      await stockValidation.validateEditStock(req.body);
      await stockService.editStock(req.body);
      responseHelper.success(res, "UPDATE_SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  async deleteMultipleStocks(req, res) {
    try {
      console.log("req.body =>", req.body);
      await stockValidation.validateMultipleStockId(req.body);
      await stockService.deleteMultipleStocks(req.body);
      responseHelper.success(res, "DELETE_SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  async getRandomStock(req, res) {
    try {
      const result = await stockService.getRandomStock();
      responseHelper.success(res, "", result);
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  async getPortfolio(req, res) {
    try {
      const result = await stockService.getPortfolio(req.user_id);
      responseHelper.success(res, "", result);
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  async addStockToPortfolio(req, res) {
    try {
      await stockValidation.validateAddStockToPortfolio(req.body);
      const result = await stockService.addStockToPortfolio(
        req.body,
        req.user_id
      );
      responseHelper.success(res, "", result);
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  async getStockForPortfolio(req, res) {
    try {
      const result = await stockService.getStockForPortfolio(req.user_id);
      responseHelper.success(res, "", result);
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  async sellStock(req, res) {
    try {
      console.log("req.body ==>", req.body);
      await stockValidation.validateSellStock(req.body);
      await stockService.sellStock(req.body.id);
      responseHelper.success(res, "SELL_SUCCESS");
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  //transaction
 async transaction(req, res) {
  try {
    const { search, sortBy, sortOrder, page, pageSize } = req.body;

    const result = await stockService.transaction(
      req.user_id,
      search || "",
      sortBy || "id",
      sortOrder || "ASC",
      parseInt(page) || 1,
      parseInt(pageSize) || 10
    );

    responseHelper.success(res, "", result);
  } catch (error) {
    console.error(error);
    responseHelper.error(res, "");
  }
}

  async getTransaction(req, res) {
    try {
       await stockValidation.validateSellStock(req.body);
      const result = await stockService.getTransaction(req.body);
      responseHelper.success(res, "", result);
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }

  async editTransaction(req, res) {
    try {
       await stockValidation.validateEditTransaction(req.body);
      const result = await stockService.editTransaction(req.body);
      responseHelper.success(res, "", result);
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }

   async deleteTransaction(req, res) {
    try {
       await stockValidation.validateSellStock(req.body);
      const result = await stockService.deleteTransaction(req.body);
      responseHelper.success(res, "", result);
    } catch (error) {
      console.log(error);
      responseHelper.error(res.error);
    }
  }
  
}
module.exports = new StockController();
