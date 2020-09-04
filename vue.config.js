const webpack = require('webpack');

module.exports = {
  publicPath: './',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '萌兔窩｜細心呵護您的小萌寵',
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .test(/\.js?$/)
      .exclude.add(/node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/)
      .end();
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
        'window.Quill': 'quill',
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
};
