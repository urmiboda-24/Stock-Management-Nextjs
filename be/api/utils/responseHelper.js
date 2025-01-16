const messages = require("./messages.json");

class ResponseHelper {
  error(res, msg, language, data) {
    // console.log("res====>>>", res);
    let status_code = 404;
    let response = {
      success: false,
      status: status_code,
      message: this.getMessage(msg, "en") ? this.getMessage(msg, "en") : msg,
    };
    if (msg == "INVALID_TOKEN") {
      response.code = 403;
      status_code = 403;
    }
    if (msg == "USER_BANNED") {
      response.code = 403;
      status_code = 403;
    }
    if (msg == "INVALID_APP_VERSION" || msg == "UPGRADE_APP") {
      response.code = 304;
      status_code = 304;
    }
    if (msg == "TOKEN_EXPIRED") {
      response.code = 401;
      status_code = 401;
    }
    console.log(
      "\n\n\n============================= FAIL RESPONSE====================================="
    );
    console.log(response);
    console.log(
      "================================================================================\n\n\n"
    );
    res.status(status_code).json(response);
  }

  success(res, msg, data, keyValue, total) {
    let response = {
      success: true,
      status: 200,
      data: data,
      ...keyValue,
      total: total,
    };
    if (msg) {
      response.message = this.getMessage(msg, "en");
    }
    res.status(200).json(response);
  }

  getMessage(msg, language) {
    let lang = "en";
    if (language) {
      lang = language;
    }
    if (msg.param && msg.param.includes("email")) {
      msg.param = "email";
    }
    if (msg.type && msg.type.includes("and")) {
      return msg.message;
    }
    if (msg.param && msg.type) {
      if (msg.type.includes("required")) {
        return messages[lang]["PARAM_REQUIRED"].replace("PARAM", msg.param);
      } else if (msg.type.includes("min")) {
        return msg.message;
      } else {
        return messages[lang]["INVALID_PARAM"].replace("PARAM", msg.param);
      }
    } else if (msg.toString().includes("ReferenceError:")) {
      return messages[lang]["INTERNAL_SERVER_ERROR"];
    } else {
      return messages[lang][msg] || messages[lang]["SOMETHING_WENT_WRONG"];
    }
  }
}

module.exports = new ResponseHelper();
