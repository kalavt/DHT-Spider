const Spider = require("dhtspider");
const exitHook = require("async-exit-hook");
require("./spider_extend");

const spider = new Spider();
spider.loadNodes();
spider.tableCaption = parseInt(process.env.TABLE_CAPTION || 200);

spider.on("ensureHash", (hash, addr) =>
  console.log(`magnet:?xt=urn:btih:${hash}`)
);

exitHook((exit) => {
   spider.saveNodes(exit);
});

spider.listen(parseInt(process.env.PORT || 6881));
