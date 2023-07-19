"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose["default"].Schema({
  aud: {
    type: String,
    required: true
  },
  azp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  email_verified: {
    type: Boolean,
    required: true
  },
  exp: {
    type: Number,
    required: true
  },
  family_name: {
    type: String,
    required: true
  },
  given_name: {
    type: String,
    required: true
  },
  iat: {
    type: Number,
    required: true
  },
  iss: {
    type: String,
    required: true
  },
  jti: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nbf: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  sub: {
    type: String,
    required: true
  }
});
var user = _mongoose["default"].model('user', userSchema);
var _default = user;
exports["default"] = _default;