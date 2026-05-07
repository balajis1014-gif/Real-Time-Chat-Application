const express = require("express");
const cors = require("cors");
const expressRateLimit = require("express-rate-limit");
const { connectDb } = require("./src/connection");
require("dotenv").config();

const app = express();

app.use(cors({}));
app.use(express.json());

app.use(
  expressRateLimit({
    windowMs: 15 * 60 * 1000, //5Min
    limit: 1000,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

async function startServer() {
  //Connect database
  connectDb();

  app.use("/api/chat", require("./src/routes"));

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
}

startServer();
