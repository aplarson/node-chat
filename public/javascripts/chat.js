;(function () {
  var nicknameReq = new RegExp(/^\/nick /);

  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  }

  var Chat = window.ChatApp.Chat = function (socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    if (nicknameReq.test(message)) {
      this.socket.emit("nicknameChangeRequest", { nickname: message });
    } else {
      this.socket.emit("message", { message: message });
    }
  };
})();
