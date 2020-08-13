const webpack = require("webpack");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/board.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    config
      .plugin("html")
      .tap((args) => {
        args[0].title = "Sudoku Solver";
        // args[0].meta = { viewport: "width=device-width,initial-scale=1,user-scalable=no" };
        return args;
      })
  },
  configureWebpack: () => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          "process.env.VERSION": JSON.stringify(require("./package.json").version),
        })
      ]
    }
  },
}
