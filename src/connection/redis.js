const Redis = require("ioredis");
const { CONFIG } = require("../config");

const redisConnection = new Redis({
  host: CONFIG.REDIS.HOST,
  port: CONFIG.REDIS.PORT,
  password: CONFIG.REDIS.PASSWORD,
});

redisConnection.on("connect", () => {
  console.log("Redis connected");
});

redisConnection.on("error", (error) => {
  console.log("Redis connection error", error);
});

module.exports = redisConnection;
