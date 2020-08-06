import webpack from "webpack"

module.exports = {
  configureWebpack: ()  => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          "process.env.VERSION": JSON.stringify(require("./package.json").version),
        })
      ]
    }
  },
}