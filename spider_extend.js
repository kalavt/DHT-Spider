const Spider = require("dhtspider");
var fs = require("fs");

Spider.prototype.bootstraps = [
  { address: "router.bittorrent.com", port: 6881 },
  { address: "dht.transmissionbt.com", port: 6881 },
  { address: "router.utorrent.com", port: 6881 },
];

Spider.prototype.saveNodes = function (cb) {
  fs.writeFile(".session", JSON.stringify(this), cb);
};

Spider.prototype.loadNodes = function () {
  fs.readFile(".session", "utf-8", (err, data) => {
    if (!err && data) {
      var session = JSON.parse(data.toString());
      this.token.token = session.token.token;
      this.table.nodes = session.table.nodes;
      this.table.id = session.table.id;
    }
  });
};

Spider.prototype.shrink = async function () {};
