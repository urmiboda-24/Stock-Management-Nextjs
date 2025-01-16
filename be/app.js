if (!Object.hasOwn) {
  Object.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
}
var createError = require("http-errors");
var express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./api/utils/swaggerHelper"); // Import the Swagger configuration
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const cors = require("cors");
// helmet
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var v1Routes = require("./routes/v1Routes");
const db = require("./api/utils/db");

var app = express();
var server = require("http").Server(app);
// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
const corsOptions = {
  origin: "*",
  credentials: false,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/v1", v1Routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

db.getConnection()
  .then(() => {
    server.listen(3001, () => {
      console.log(`Server Started at http://localhost:${3001}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
