const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src_client/client.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./client_packages"),
  }
}