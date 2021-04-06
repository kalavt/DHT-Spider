const Spider = require("dhtspider");
var fs = require("fs");

Spider.prototype.bootstraps = [
  { address: "router.bittorrent.com", port: 6881 },
  { address: "dht.transmissionbt.com", port: 6881 },
  { address: "router.utorrent.com", port: 6881 },
];

Spider.prototype.saveNodes = function (cb) {
  fs.writeFile("token", JSON.stringify(this.token), () => {
    fs.writeFile("table", JSON.stringify(this.table), cb);
  });
};

Spider.prototype.loadNodes = function () {
  fs.readFile("table", "utf-8", (err, data) => {
    if (!err && data) {
      this.table.nodes = JSON.parse(data.toString()).nodes;
    }
  });
  fs.readFile("token", "utf-8", (err, data) => {
    if (!err && data) {
      this.token = JSON.parse(data.toString());
    }
  });
};

Spider.prototype.shrink = async function () {};
