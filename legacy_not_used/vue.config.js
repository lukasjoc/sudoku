module.exports = {
  assetsDir: "@/assets",
  outputDir: "build",
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/board.scss";'
      }
    }
  }
}
