const webpack = require("webpack")

module.exports = {
  configureWebpack: () => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          "process.env.VERSION": JSON.stringify(require("./package.json").version),
        })
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData:  `@import "@/assets/scss/board.scss";`
      }
    }
  }
}
