"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _conversationController = require("../controller/conversation-controller.js");
var _userController = require("../controller/user-controller.js");
var _messageController = require("../controller/message-controller.js");
var _imageController = require("../controller/image-controller.js");
var _upload = _interopRequireDefault(require("../utils/upload.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = _express["default"].Router();
route.post('/add', _userController.addUser);
route.get('/users', _userController.getUser);
route.post('/conversation/add', _conversationController.newConversation);
route.post('/conversation/get', _conversationController.getConversation);
route.post('/message/add', _messageController.newMessage);
route.get('/message/get/:id', _messageController.getMessage);
route.post('/message/delete', _messageController.deleteMessage);
route.post('/file/upload', _upload["default"].single('file'), _imageController.uploadImage);
route.get('/file/:filename', _imageController.getImage);
var _default = route;
exports["default"] = _default;