const bcrypt = require("bcrypt");
const promise = require("bluebird");
const saltRound = 10;
class PasswordHelper {
  async getPasswordHash(password) {
    return bcrypt.hash(password, saltRound);
  }

  async checkPassword(enteredPassword, storedPassword) {
    try {
      let compare = await bcrypt.compare(enteredPassword, storedPassword);

      if (compare) {
        return true;
      } else {
        throw "INCORRECT_PASSWORD";
      }
    } catch (error) {
      return promise.reject(error);
    }
  }
}

module.exports = new PasswordHelper();
