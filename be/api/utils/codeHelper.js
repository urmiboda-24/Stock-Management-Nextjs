const promise = require("bluebird");
const jwt = require("jsonwebtoken");
const config = require("./config");
const nodemailer = require("nodemailer");

class CodeHelper {
  async getOTP() {
    let num = String(Math.floor(Math.random() * 10000)).padEnd(5, 0);
    // num = 1234
    return num;
  }
  getJwtToken(user_id, for_admin) {
    try {
      let expirationTime = 300 * 60,
        sign = {
          user_id: user_id,
        };
      if (for_admin) {
        sign.is_admin = true;
        expirationTime = 300 * 60;
      }
      let token = jwt.sign(sign, config.JWTSecretKey, {
        expiresIn: expirationTime,
      });
      return token;
    } catch (error) {
      return promise.reject(error);
    }
  }
  refreshToken(old_token, refresh_token, for_admin) {
    try {
      let token,
        decoded = jwt.decode(old_token);

      if (refresh_token == config.refresh_token && decoded && decoded.user_id) {
        token = this.getJwtToken(decoded.user_id, for_admin);
      } else {
        throw "TOKEN_MALFORMED";
      }
      return token;
    } catch (error) {
      return promise.reject(error);
    }
  }
  decodeToken(token) {
    try {
      return new promise((resolve, reject) => {
        jwt.verify(token, config.JWTSecretKey, async (error, decoded) => {
          if (error) {
            console.log(error);
            reject("TOKEN_EXPIRED");
          } else {
            resolve(decoded);
          }
        });
      });
    } catch (error) {
      return promise.reject(error);
    }
  }
  decodeTokenWithoutExpiredCheck(token) {
    try {
      let decoded = jwt.decode(token);
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }
  async sendMail(receiverEmail, link) {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.email,
          pass: config.appPassword,
        },
      });

      let mailOptions = {
        from: config.email,
        to: receiverEmail,
        subject: "Forgot Password",
        text: `Please click this link to reset your password: ${link}`,
      };

      let info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return error;
    }
  }
  generateRandomNumbers(min, max) {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumbers.push(randomNumber);
    }

    return randomNumbers;
  }
  last10Days = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date
        .toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })
        .replace(/^(\w+) (\d+)$/, "$2 $1");
      days.push(formattedDate);
    }
    return days.reverse();
  };

  last10Weekdays = () => {
    const days = [];
    const gap = 7; // 7-day gap
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i * gap);
      const formattedDate = date
        .toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })
        .replace(/^(\w+) (\d+)$/, "$2 $1");
      days.push(formattedDate);
    }
    return days.reverse();
  };
  last10Months = () => {
    const months = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(
        date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      );
    }
    return months.reverse();
  };
  last10Years = () => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setFullYear(date.getFullYear() - i);
      years.push(date.getFullYear());
    }
    return years.reverse();
  };
  calculatePercentageChange(oldPrice, newPrice) {
    if (oldPrice === 0) {
      throw new Error("Old price cannot be zero.");
    }

    const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;
    return percentageChange.toFixed(2);
  }
}

module.exports = new CodeHelper();
