require("dotenv").config();
const ENV = process.env;
const CONFIG = {
  MAIL: {
    SEND_MAILER: ENV.BREVO_SENDER_USER,
    API_KEY: ENV.BREVO_API_KEY,
  },
  REDIS: {
    HOST: ENV.REDIS_HOST,
    PORT: ENV.REDIS_PORT,
    PASSWORD: ENV.REDIS_PASS,
  },
  DB: {
    URL: ENV.MONGO_URL,
  },
};

module.exports = { CONFIG };
