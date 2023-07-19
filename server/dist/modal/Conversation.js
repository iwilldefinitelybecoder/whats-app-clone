"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ConversationSchema = new _mongoose["default"].Schema({
  members: {
    type: Array
  },
  message: {
    type: String
  }
}, {
  timestamps: true
});
var conversation = _mongoose["default"].model('Conversation', ConversationSchema);
var _default = conversation;
exports["default"] = _default;