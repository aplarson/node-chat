var guestNumber = 1;
var nicknames = {};
var nicknamePattern = new RegExp(/^Guest\d+$/);

function createChat (server) {
  var io = require("socket.io")(server);

  io.on("connection", function (socket) {
    nicknames[socket.id] = "Guest" + guestNumber.toString();
    guestNumber += 1;
    io.emit("nicknameUpdate", { nicknames: nicknames });

    socket.on("message", function (data) {
      io.emit("message", { message: data, author: nicknames[socket.id] });
    });

    socket.on("nicknameChangeRequest", function (data) {
      var nickname = data.nickname.split(" ")[1];
      if (nicknamePattern.test(nickname)) {
        socket.emit("nicknameChangeResult", {
          success: false,
          message: "Nicknames cannot be of the format Guest#"
        })
      }
      for (var name in nicknames) {
        if (nicknames[name] === nickname) {
          socket.emit("nicknameChangeResult", {
            success: false,
            message: "Nickname already taken"
          });
          return;
        }
      }
      nicknames[socket.id] = nickname;
      socket.emit("nicknameChangeResult", {
        success: true,
        message: "Nickname changed to " + nickname
      });
      io.emit("nicknameUpdate", { nicknames: nicknames });
    });

    socket.on("disconnect", function () {
      delete nicknames[socket.id];
      io.emit("nicknameUpdate", { nicknames: nicknames });
    });
  });
}

module.exports = createChat;
