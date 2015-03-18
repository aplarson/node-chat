;(function () {
  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  }

  var ChatUI = window.ChatApp.ChatUI = function () {
    var socket = io();
    this.chat = new ChatApp.Chat(socket);
    this.$input = $("#chat-input");
    this.$display = $("#chat-display");
    this.$input.on("submit", this.submit.bind(this));
    socket.on("message", this.receive.bind(this));
  };

  ChatUI.prototype.receive = function (broadcast) {
    var $messageEl = $("<p>").text(broadcast.message.message);
    this.$display.append($messageEl);
  };

  ChatUI.prototype.submit = function (event) {
    event.preventDefault();
    var textarea = this.$input.find("#chat_content")
    this.chat.sendMessage(textarea.val());
    textarea.val("");
  };
})();
