const jwt = require("jsonwebtoken");
const promise = require("bluebird");
const config = require("./config");
const db = require("./db");
const responseHelper = require("./responseHelper");

class HeaderValidator {
  validateHeaders(headers) {
    let error;
    if (!headers.auth_token) {
      error = { param: "auth_token", type: "required" };
    }
    return error;
  }

  // nonAuthValidation(req, res, next) {
  //   let error = HV.validateHeaders(req.headers);
  //   if (error) {
  //     responseHelper.error(res, error, req.headers.language);
  //   } else if (req.headers.auth_token !== config.default_auth_token) {
  //     responseHelper.error(res, "INVALID_TOKEN", req.headers.language);
  //   } else {
  //     next();
  //   }
  // }

  authValidation(req, res, next) {
    let error = HV.validateHeaders(req.headers);
    if (error) {
      responseHelper.error(res, error, req.headers.language);
    } else {
      let token = req.headers.auth_token;

      jwt.verify(token, config.JWTSecretKey, (err, decoded) => {
        if (err) {
          console.log("error==============", err);

          if (req.route.path === "/refreshToken") {
            next();
          } else {
            responseHelper.error(res, "TOKEN_EXPIRED", req.headers.language);
          }
        } else if (decoded && decoded.user_id) {
          req.user_id = decoded.user_id;
          req.query.user_id = decoded.user_id;
          req.body.user_id = decoded.user_id;
          if (decoded.is_admin) {
            delete req.body.user_id;
            req.body.admin_id = decoded.user_id;
            req.query.admin_id = decoded.user_id;
            req.is_admin = decoded.is_admin;
            next();
          }
          next();
        } else {
          responseHelper.error(res, "TOKEN_MALFORMED", req.headers.language);
        }
      });
    }
  }

  isAdmin(req, res, next) {
    if (req.is_admin) {
      next();
    } else {
      responseHelper.error(res, "NOT_AUTHORIZED", req.headers.language);
    }
  }

  isUser(req, res, next) {
    if (req.user_type === 0) {
      next();
    } else {
      responseHelper.error(res, "NOT_AUTHORIZED", req.headers.language);
    }
  }

  async isUserActive(req, res, next, decoded) {
    let selectParams = "is_active",
      where = `user_id='${decoded.user_id}'`,
      user = "";
    if (decoded.user_type == 0) {
      user = await db.select("mst_user", selectParams, where);
    }
    if (user[0] && user[0].is_active) {
      // next();
      HV.isUserDelete(req, res, next, decoded);
    } else {
      responseHelper.error(res, "USER_BLOCKED", req.headers.language);
    }
  }

  async isUserDelete(req, res, next, decoded) {
    let selectParams = "is_deleted",
      where = `user_id = '${decoded.user_id}'`,
      user = "";
    if (decoded.user_type == 0) {
      user = await db.select("mst_user", selectParams, where);
    }
    if (user[0] && user[0].is_deleted == 0) {
      next();
    } else {
      responseHelper.error(res, "USER_DELETED", req.headers.language);
    }
  }

  authValidationSocket(req) {
    return new promise((resolve, reject) => {
      let error = HV.validateHeaders(req.headers);
      if (error) {
        reject(error);
      } else {
        let token = req.headers.auth_token;
        jwt.verify(token, config.JWTSecretKey, async (err, decoded) => {
          if (err) {
            reject("TOKEN_EXPIRED");
          } else if (decoded && decoded.user_id && decoded.user_type + 1) {
            req.user_id = decoded.user_id;
            req.user_type = decoded.user_type;
            if (decoded.is_admin) {
              req.is_admin = decoded.is_admin;
            }
            const res_final = await HV.isUserActiveSocket(req, decoded);
            resolve(res_final);
          } else {
            reject("TOKEN_MALFORMED");
          }
        });
      }
    });
  }

  async isUserActiveSocket(req, decoded) {
    let selectParams = "is_active ",
      where = ` service_provider_id='${decoded.user_id}' `,
      user = await db.select("service_provider", selectParams, where);
    if (user[0] && user[0].is_active) {
      return req;
    } else {
      return promise.reject("USER_BLOCKED");
    }
  }

  decodeToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.JWTSecretKey, (err, decoded) => {
        if (err) return reject("TOKEN_MALFORMED");
        else return resolve(decoded);
      });
    });
  }
}

const HV = new HeaderValidator();
module.exports = HV;
