const Spider = require("dhtspider");
var fs = require("fs");

Spider.prototype.bootstraps = [
  { address: "router.bittorrent.com", port: 6881 },
  { address: "dht.transmissionbt.com", port: 6881 },
  { address: "router.utorrent.com", port: 6881 },
];

Spider.prototype.saveNodes = function (cb) {
  fs.writeFile(".session", JSON.stringify(this), cb || (() => {}));
};

function isString (x) {
  return typeof x === 'string'
}

function isObject (x) {
  return typeof x === 'object' && x !== null
}


function isBufferLike(x) {
  return (
    isObject(x) && x.type === "Buffer" && (isArray(x.data) || isString(x.data))
  );
}

function isArray(x) {
  return Array.isArray(x);
}

function reviver(key, value) {
  if (isBufferLike(value)) {
    if (isArray(value.data)) {
      return Buffer.from(value.data);
    } else if (isString(value.data)) {
      if (value.data.startsWith("base64:")) {
        return Buffer.from(value.data.slice("base64:".length), "base64");
      }
      return Buffer.from(value.data);
    }
  }
  return value;
}

Spider.prototype.loadNodes = function () {
  fs.readFile(".session", "utf-8", (err, data) => {
    if (!err && data) {
      var session = JSON.parse(data.toString(), reviver);
      this.token.token = session.token.token;
      this.table.nodes = session.table.nodes;
      this.table.id = session.table.id;
    }
  });
};

Spider.prototype.shrink = async function () {};
