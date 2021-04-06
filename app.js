const Spider = require("dhtspider");
const exitHook = require("async-exit-hook");
require("./spider_extend");

//setup db
const dynamoose = require("dynamoose");
const add = require("async-exit-hook");
dynamoose.aws.ddb.local(process.env.backend);
var InfoHash = dynamoose.model("InfoHash", {
  hash: String,
  addr: {
    address:String,
    port:Number
  },
});

const spider = new Spider();
spider.loadNodes();
spider.tableCaption = parseInt(process.env.TABLE_CAPTION || 200);

spider.on("ensureHash", async (hash, addr) => {
  console.log(`magnet:?xt=urn:btih:${hash}`);
  console.log(addr);
  await new InfoHash({
    hash: hash,
    addr: addr,
  }).save();
});

exitHook((exit) => {
  spider.saveNodes(exit);
});

spider.listen(parseInt(process.env.PORT || 6881));
