"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MessageSchema = new _mongoose["default"].Schema({
  conversationId: {
    type: String
  },
  senderId: {
    type: String
  },
  receiverId: {
    type: String
  },
  text: {
    type: String
  },
  type: {
    type: String
  }
}, {
  timestamps: true
});
var message = _mongoose["default"].model('Message', MessageSchema);
var _default = message;
exports["default"] = _default;