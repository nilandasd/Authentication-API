require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./api-doc");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const server = require("https");
const PORT = process.env.PORT || 5000;
const uri = process.env.URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://localhost:5000"],
    credentials: true,
  })
);

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc)
);

//SELF SIGNED!
server
  .createServer(
    {
      key: process.env.PRIVATE_KEY,
      cert: process.env.CERTIFICATE,
    },
    app
  )
  .listen(PORT, () => console.log(`server listening on port: ${PORT}`));