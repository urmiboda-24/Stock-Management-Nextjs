const { uuid } = require("uuidv4");
const dateHelper = require("../../utils/dateHelper");
const db = require("../../utils/db");
const passwordHelper = require("../../utils/passwordHelper");
const promise = require("bluebird");
const codeHelper = require("../../utils/codeHelper");

class UserService {
  async isEmailExits(email) {
    try {
      let where = `email = '${email}'`;
      let data = await db.select("stock_user", "*", where);
      if (data.length > 0) {
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return promise.reject(error);
    }
  }
  async isUserNameExits(user_name) {
    try {
      let where = ` user_name ilike '${user_name}'`;
      let data = await db.select("stock_user", "*", where);
      if (data.length > 0) {
        throw "USERNAME_ALREADY_EXITS";
      } else {
        return data;
      }
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getEmailId(id) {
    try {
      let where = ` id = ${id}`;
      let data = await db.select("stock_user", "*", where);
      console.log("data =>", data);
      if (data.length > 0) {
        return data;
      } else {
        throw "EMAIL_DID_NOT_FOUND";
      }
    } catch (error) {
      return promise.reject(error);
    }
  }
  async createUser(body) {
    try {
      let data = {
        email: body.email,
        password: await passwordHelper.getPasswordHash(body.password),
        full_name: body.full_name,
        created_at: dateHelper.getCurrentTimeStamp(),
        updated_at: dateHelper.getCurrentTimeStamp(),
      };
      let user = await db.insert("stock_user", data);
      return user;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async getAllUser(body) {
    try {
      let join = ` LEFT JOIN one_to_one_chat o ON u.id = o.sender_id OR u.id = o.receiver_id `;
      const where = ` (not u.id = ${body.user_id}) AND (o.sender_id = ${body.user_id} OR o.receiver_id = ${body.user_id})`;
      let data = await db.select("user u" + join, "DISTINCT u.*", where);
      return data;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async addNewMessage(body) {
    try {
      let data = {
        sender_id: body.sender_id,
        receiver_id: body.receiver_id,
        message: body.message,
        conversation_id: body.conversation_id,
        created_at: dateHelper.getCurrentTimeStamp(),
        updated_at: dateHelper.getCurrentTimeStamp(),
      };
      let message = await db.insert("one_to_one_chat", data);
      return message;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getConversation(body) {
    try {
      const where = ` (sender_id = ${body.sender_id} AND receiver_id = ${body.receiver_id}) OR (sender_id = ${body.receiver_id} AND receiver_id = ${body.sender_id})`;
      const data = await db.select("one_to_one_chat", "*", where);
      return data;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async joinRoom(body) {
    try {
      const where = ` (sender_id = ${body.sender_id} AND receiver_id = ${body.receiver_id}) OR (sender_id = ${body.receiver_id} AND receiver_id = ${body.sender_id})`;
      const data = await db.select("chat_room", "*", where);
      if (data.length > 0) {
        return data;
      } else {
        const params = {
          sender_id: body.sender_id,
          receiver_id: body.receiver_id,
          room_id: uuid(),
        };
        const data = await db.insert("chat_room", params);
        return [data];
      }
    } catch (error) {
      return promise.reject(error);
    }
  }

  async searchUser(body) {
    try {
      const where = ` user_name ILIKE '%${body.user_name}%' AND not id = ${body.user_id}`;
      const data = await db.select("users", "*", where);
      return data;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async forgotPasswordMail(email, token) {
    try {
      const link = `http://localhost:3000/resetPassword?token=${token}`;
      await codeHelper.sendMail(email, link);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async updatePassword(id, body) {
    try {
      const data = {
        password: await passwordHelper.getPasswordHash(body.password),
      };
      const where = ` id = ${id}`;
      const result = await db.update("stock_user", where, data);
      return result;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async checkPhoneNumberExits(body, id) {
    try {
      const where = ` phone_number = ${body.phone_number} and user_id <> ${id}`;
      const result = await db.select("user_detail", "*", where);
      if (result.length > 0) {
        throw "PHONE_NUMBER_ALREADY_EXITS";
      } else {
        return true;
      }
    } catch (error) {
      return promise.reject(error);
    }
  }
  async addUserInfo(body, id) {
    try {
      const data = {
        user_id: id,
        first_name: body.first_name,
        last_name: body.last_name,
        birthday: body.birthday,
        gender: body.gender,
        phone_number: body.phone_number,
        address: body.address,
        block_no: body.block_no,
        city: body.city,
        state: body.state,
        zip: body.zip,
        created_at: dateHelper.getCurrentTimeStamp(),
        updated_at: dateHelper.getCurrentTimeStamp(),
      };
      await db.insert("user_detail", data);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async uploadProfilePic(id, files) {
    try {
      const data = {
        updated_at: dateHelper.getCurrentTimeStamp(),
        profile_pic: files.originalname,
      };
      const where = ` user_id = ${id}`;
      await db.update("user_detail", where, data);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async uploadCoverPic(id, files) {
    try {
      const data = {
        updated_at: dateHelper.getCurrentTimeStamp(),
        cover_pic: files.originalname,
      };
      const where = ` user_id = ${id}`;
      await db.update("user_detail", where, data);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async updateUserInfo(body, id) {
    try {
      let data = {
        updated_at: dateHelper.getCurrentTimeStamp(),
      };
      if (body.first_name) {
        data.first_name = body.first_name;
      }
      if (body.last_name) {
        data.last_name = body.last_name;
      }
      if (body.birthday) {
        data.birthday = body.birthday;
      }
      if (body.gender) {
        data.gender = body.gender;
      }
      if (body.phone_number) {
        data.phone_number = body.phone_number;
      }
      if (body.address) {
        data.address = body.address;
      }
      if (body.block_no) {
        data.block_no = body.block_no;
      }
      if (body.city) {
        data.city = body.city;
      }
      if (body.state) {
        data.state = body.state;
      }
      if (body.zip) {
        data.zip = body.zip;
      }
      const where = ` user_id = ${id}`;
      await db.update("user_detail", where, data);
      return true;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getUserInfo(id) {
    try {
      const where = ` user_id = ${id}`;
      const data = await db.select("user_detail", "*", where);
      return data;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async getUserProfile(id) {
    // select * from stock_user left join user_detail on stock_user.id = user_detail.user_id where stock_user.id = 5
    try {
      let where = ` stock_user.id = ${id}`;
      let join = ` left join user_detail on stock_user.id = user_detail.user_id`;
      const result = db.select("stock_user" + join, "*", where);
      return result;
    } catch (error) {
      return promise.reject(error);
    }
  }
  async updateNotificationStatus(notification, id) {
    try {
      let where = ` user_id = ${id}`;
      let data = {};
      if (notification.company_news !== undefined) {
        data.company_news = notification.company_news;
      }
      if (notification.account_activity !== undefined) {
        data.account_activity = notification.account_activity;
      }
      if (notification.meetups !== undefined) {
        data.meetups = notification.meetups;
      }
      const result = db.update("user_detail", where, data);
      return result;
    } catch (error) {
      return promise.reject(error);
    }
  }
}
module.exports = new UserService();
// SELECT phone_number FROM users WHERE phone_number = '123-456-7890' AND user_id <> 10;
