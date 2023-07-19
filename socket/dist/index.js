"use strict";

var _socket = require("socket.io");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var io = new _socket.Server(9000, {
  cors: {
    origin: 'http://localhost:3000'
  }
});
var users = [];
var addUser = function addUser(userData, socketId) {
  !users.some(function (user) {
    return user.sub === userData.sub;
  }) && users.push(_objectSpread(_objectSpread({}, userData), {}, {
    socketId: socketId
  }));
};
var removeUser = function removeUser(socketId) {
  users = users.filter(function (user) {
    return user.socketId !== socketId;
  });
};
var getUser = function getUser(userId) {
  return users.find(function (user) {
    return user.sub === userId;
  });
};
io.on('connection', function (socket) {
  console.log('user connected');
  socket.count = 0;
  //connect   
  socket.on("addUser", function (userData) {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  //send message
  socket.on('sendMessage', function (data) {
    try {
      var user = getUser(data.receiverId);
      io.to(user.socketId).emit('getMessage', data);
    } catch (error) {
      var senderId = getUser(data.senderId);
      if (socket.count === 0) {
        io.to(senderId.socketId).emit('offline');
        console.log('offline emit working');
        socket.count++;
      }
      console.log("user".concat(data.receiverId, " offline"));
    }
  });

  //typing effect   
  socket.on('typing', function (data) {
    try {
      var user = getUser(data.receiverId);
      io.to(user.socketId).emit('typer', data);
    } catch (error) {
      console.log("user".concat(data.receiverId, " offline"));
    }
  });

  //ChatDeletion  
  socket.on('deleted', function (data) {
    try {
      var user = getUser(data.receiverId);
      console.log(user.socketId);
      io.to(user.socketId).emit('deletion', data);
    } catch (error) {
      console.log("user".concat(data.receiverId, " offline"));
    }
  });

  //disconnect   
  socket.on('disconnect', function () {
    console.log('user disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});