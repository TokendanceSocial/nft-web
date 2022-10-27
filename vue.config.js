const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    https: true,
    port: 9000,
    // allowedHosts: 'all',
    // host: 'home.youdao.com'
    // lintOnSave: false
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'TokenDance 2022';
        return args;
      });
  },
});
