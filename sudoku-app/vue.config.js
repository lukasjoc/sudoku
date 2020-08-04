const webpack = require("webpack")

module.exports = {
  configureWebpack: config => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          "process.env.VERSION": JSON.stringify(require("./package.json").version),
        })
      ]
    }
  },
}