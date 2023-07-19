"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _multerGridfsStorage = require("multer-gridfs-storage");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var username = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;
var storage = new _multerGridfsStorage.GridFsStorage({
  url: "mmongodb+srv://tonystarkv9:bmPuu9Tpze2PzBzH@cluster0.w83fizs.mongodb.net/?retryWrites=true&w=majority",
  options: {
    useNewUrlParser: true
  },
  file: function file(request, _file) {
    var match = ["image/png", "image/jpg"];
    if (match.indexOf(_file.memeType) === -1) return "".concat(Date.now(), "-blog-").concat(_file.originalname);
    return {
      bucketName: "photos",
      filename: "".concat(Date.now(), "-blog-").concat(_file.originalname)
    };
  }
});
var _default = (0, _multer["default"])({
  storage: storage
});
exports["default"] = _default;