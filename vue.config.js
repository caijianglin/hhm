const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 代码压缩优化
const TerserPlugin = require("terser-webpack-plugin");
// 引入
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // baseUrl从vue cli 3.3起已经弃用了，用publicPath来代替
  // process.env.NODE_ENV === "production" ? "./" : "/"
  publicPath: "./", // 部署应用包时的基本URL(这里可以看一下官方说明)
  outputDir: "hhm", // 打包时生成的生产环境构建稳健的目录
  assetsDir: "static_", // 放置生成的静态资源的目录
  filenameHashing: true,
  lintOnSave: true, // eslint-loader会将lint错误输出为编译警告
  productionSourceMap: false, // 如果你不需要生产环境的source map，可以将其设置为false，以加速生产环境的构建
  configureWebpack: config => {
    // alias简化引用路径
    config.name = "hdh_portal";
    config.resolve.alias = {
      "@": resolve("src"),
      "@assets": resolve("src/assets"),
      "@components": resolve("src/components"),
      "@utils": resolve("src/utils"),
      "@views": resolve("src/views"),
      "@api": resolve("src/api")
    };
    config.externals = {
      echarts: "echarts" // 配置使用CDN
    };

    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      // Gzip配置
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: "[path].gz[query]",
      //     algorithm: "gzip",
      //     test: /\.css$|\.ttf$|\.html$|\.svg$|\.json$|\.js$/,
      //     threshold: 10240, // 只有大小大于该值的资源会被处理
      //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      //     deleteOriginalAssets: false // 删除原文件
      //   })
      // );
      const performance = {
        hints: false
      };
      const optimization = {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            // sourceMap: true,
            terserOptions: {
              output: {
                ascii_only: true // <- Add this to keep the regex valid
              },
              compress: {
                drop_console: true // 清除console
              }
            }
          })
        ]
      };
      Object.assign(config, {
        performance,
        optimization
      });
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
  },
  chainWebpack: config => {
    //https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
    // 链式配置

    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    //开发模式下应用cheap-source-map模式
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      );
  },
  css: {
    // css预设器配置项
    loaderOptions: {
      css: {},
      postcss: {}
    }
  },
  devServer: {
    host: "localhost",
    port: 8687,
    https: false,
    open: false,
    proxy: {
      "": {
        target: "http://127.0.0.1:8080/", // 测试
        // target: "http://3073z0v901.qicp.vip",
        changeOrigin: true
      }
      // "/hhm/commons": {
      //   target: "http://14w90699e9.iok.la", // 测试
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/hhm/commons": "/default/commons"
      //   }
      // }
    }, // 设置代理
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
