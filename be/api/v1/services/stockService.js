const db = require("../../utils/db");
const promise = require("bluebird");
const dateHelper = require("../../utils/dateHelper");
const codeHelper = require("../../utils/codeHelper");

class StockService {
  async addStock(body) {
    try {
      let data = {
        name: body.name.trim(),
        current_price: body.current_price,
        opening_price: body.opening_price
          ? body.opening_price
          : body.current_price - 2,
        closing_price: body.closing_price
          ? body.closing_price
          : body.current_price + 5,
        high_price: body.high_price ? body.high_price : body.current_price + 10,
        low_price: body.low_price ? body.low_price : body.current_price - 7,
        created_at: dateHelper.getCurrentTimeStamp(),
        updated_at: dateHelper.getCurrentTimeStamp(),
      };
      const stock = await db.insert("stocks", data);
      return stock;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getAllStock() {
    try {
      const data = await db.select("stocks", "*");
      return data;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getStockById(id) {
    try {
      let where = `id = ${id}`;
      const data = await db.select("stocks", "*", where);
      return data;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async deleteStock(id) {
    try {
      let where = ` id = ${id}`;
      await db.delete("stocks", where);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async editStock(body) {
    try {
      let data = {
        updated_at: dateHelper.getCurrentTimeStamp(),
      };
      if (body.name) {
        data.name = body.name;
      }
      if (body.current_price) {
        data.current_price = body.current_price;
      }
      let where = ` id = ${body.id}`;
      await db.update("stocks", where, data);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async deleteMultipleStocks(body) {
    try {
      let where = ` id IN (SELECT unnest(ARRAY[${body.id}]))`;
      await db.delete("stocks", where);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getRandomStock() {
    try {
      const where = ` ORDER BY RANDOM() LIMIT 5;`;
      const data = await db.select("stocks" + where, "*");

      return data.map((stockData) => {
        const { name, current_price, low_price, high_price } = stockData;
        const dayValue = codeHelper.generateRandomNumbers(
          low_price - 100,
          high_price + 100
        );
        const weekValue = codeHelper.generateRandomNumbers(
          low_price - 150,
          high_price + 150
        );
        const monthValue = codeHelper.generateRandomNumbers(
          low_price - 200,
          high_price + 200
        );
        const yearValue = codeHelper.generateRandomNumbers(
          low_price - 200,
          high_price + 200
        );
        console.log("day =>", codeHelper.last10Days()[9]);
        return {
          stock_name: name,
          current_value: current_price,
          status: dayValue[9] > current_price ? "high" : "low",
          average: codeHelper.calculatePercentageChange(
            current_price,
            dayValue[9]
          ),
          day: codeHelper.last10Days(),
          day_value: dayValue,
          week: codeHelper.last10Weekdays(),
          week_value: weekValue,
          month: codeHelper.last10Months(),
          month_value: monthValue,
          year: codeHelper.last10Years(),
          year_value: yearValue,
        };
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getPortfolio(id) {
    try {
      let join = " LEFT JOIN stocks on portfolio.stock_id = stocks.id";
      let where = ` portfolio.user_id = ${id} `;
      const result = await db.select("portfolio" + join, "*", where);
      return result.map((stockData) => {
        const {
          id,
          name,
          current_price,
          quantity,
          stock_id,
          user_id,
          buy_at,
          portfolio_id,
        } = stockData;
        const gain = current_price * quantity - buy_at * quantity;
        return {
          name: name,
          current_price: current_price,
          user_id: user_id,
          stock_id: stock_id,
          quantity: quantity,
          buy_at: buy_at,
          status: buy_at * quantity < current_price * quantity ? "high" : "low",
          total_gain: gain,
          id: id,
          portfolio_id: portfolio_id,
        };
      });
    } catch (error) {
      return promise.reject(error);
    }
  }
  async addStockToPortfolio(body, id) {
    try {
      let data = {
        user_id: id,
        stock_id: body.stock_id,
        quantity: body.quantity,
        buy_at: body.buy_at,
        created_at: dateHelper.getCurrentTimeStamp(),
        updated_at: dateHelper.getCurrentTimeStamp(),
      };
      const result = await db.insert("portfolio", data);
      return result;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getStockForPortfolio(id) {
    try {
      let where = ` id NOT IN (SELECT DISTINCT stock_id FROM portfolio where user_id = ${id})`;
      let result = await db.select("stocks", "*", where);
      return result.map((stockData) => {
        const { id, name, current_price, low_price, high_price } = stockData;
        const yearValue = codeHelper.generateRandomNumbers(
          low_price - 200,
          high_price + 200
        );
        return {
          id: id,
          stock_name: name,
          current_value: current_price,
          buy_at: Math.abs(yearValue[0]),
        };
      });
    } catch (error) {
      console.log(error);
      return promise.reject(error);
    }
  }
  async sellStock(id) {
    try {
      let where = ` portfolio_id = ${id}`;
      await db.delete("portfolio", where);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async transaction(id, search = "", sortBy = "id", sortOrder = "ASC", page = 1, pageSize = 10) {
    try {

     let selectParams = `*`;
    let where = ` user_id=${id}`;
    
    // Add search conditions
    if (search) {
      where += ` AND (bill_title LIKE '%${search}%' OR status LIKE '%${search}%')`;
    }

    // Pagination for the query
    let pagination = ` ORDER BY ${sortBy} ${sortOrder === 'ASC' ? 'ASC' : 'DESC'} LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;
    let users = await db.select(`"Transactions"`, selectParams, where + pagination);

    // Total count without pagination
    let totalResult = await db.select(`"Transactions"`, `COUNT(*) AS total`, where);
    let total = totalResult[0]?.total || 0;
      return { User: users, total}
    } catch (error) {
      return promise.reject(error)
    }
  }


   async getTransaction(body) {
    try {
      let where = ` id = ${body.id}`;
      const data = await db.select(`"Transactions"`,"*", where);
      return data;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async editTransaction(body) { 
      try {
        let data = {};
        if (body.title) {
          data.bill_title = body.title;
        }
        if (body.issueDate) {
          data.issue_date = body.issueDate;
        }
        if (body.dueDate) {
          data.due_date = body.dueDate;
        }
        if (body.total) {
          data.total = body.total;
        }
        if (body.status) {
          data.status = body.status;
        }
        let where = ` id = ${body.id}`;
        await db.update(`"Transactions"`, where, data);
        return true;
      } catch (error) {
        return promise.reject(error);
      }
    }

    async deleteTransaction(body) {
    try {
      let where = ` id = ${body.id}`;
      await db.delete(`"Transactions"`, where);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  
}
module.exports = new StockService();
