;(function () {
  if (typeof ChatApp === "undefined") {
    window.ChatApp = {}''
  }

  var Chat = window.ChatApp.Chat = function (socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit("message", { message: message });
  };
})();
