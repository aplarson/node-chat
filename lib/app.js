var http = require("http"),
  static = require("node-static"),
  chat = require("./chat_server.js");

var file = new static.Server("./public");

var server = http.createServer(function (req, res) {
  req.addListener("end", function () {
    file.serve(req, res);
  }).resume();
});

chat(server);

server.listen(8000);
