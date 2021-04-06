const Spider = require('dhtspider')

const spider = new Spider({
    bootstraps: [
        {address: 'router.bittorrent.com', port: 6881}, 
        {address: 'dht.transmissionbt.com', port: 6881},
        {address: 'router.utorrent.com', port: 6881}
    ],
    tableCaption: parseInt(process.env.TABLE_CAPTION || 200)
})
spider.on("");

spider.on('ensureHash', (hash, addr)=> console.log(`magnet:?xt=urn:btih:${hash}`))

spider.listen(parseInt(process.env.PORT || 6881))


