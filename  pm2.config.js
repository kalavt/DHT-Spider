module.exports = {
    apps: [
      {
        name: "DHT-Spider",
        script: "index.js",
        node_args: "-r dotenv/config",
        log_file: "output.log",
        time: true,
      },
    ],
  };
  