"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _db = _interopRequireDefault(require("./database/db.js"));
var _Routes = _interopRequireDefault(require("./routes/Routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var PORT = 8000;
var username = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;
(0, _db["default"])(username, password);
app.listen(PORT, function () {
  return console.log("Server is running successfully on PORT ".concat(PORT));
});
app.use(_bodyParser["default"].json({
  extended: true
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use('/', _Routes["default"]);