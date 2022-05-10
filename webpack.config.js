/**
 * @description webpack5单页应用配置文件
 * @author aodazhang 2022.05.10
 * @extends https://webpack.docschina.org/configuration/
 */
const path = require('path')

// 一.webpack插件
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 根据模板生成html
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩js
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin') // 压缩css
const CompressionWebpackPlugin = require('compression-webpack-plugin') // html、css、js执行gizp
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // chunk包分析工具
const { GenerateSW } = require('workbox-webpack-plugin') // 生成service-worker.js
const { VueLoaderPlugin } = require('vue-loader') // vue sfc文件识别

// 二.webpack变量
/** 示例构建入口路径 */
const entryPath = path.resolve(__dirname, 'example')
/** 示例构建输出路径 */
const outputPath = path.resolve(__dirname, 'dist-example')
/** aoda.css构建入口路径 */
const scssEntryPath = path.resolve(__dirname, 'scss')
/** aoda.css构建输出路径 */
const scssOutputPath = path.resolve(__dirname, 'dist-scss')
/** aoda.css输出路径 */
const distPath = path.resolve(__dirname, 'dist')
/** 生成文件名hash规则 */
const hashRule = '[name]_[contenthash:8]'
/** 是否开启css模块化 */
const isCssModules = false
/** 是否生产环境开启source map */
const isSourceMap = false
/** 是否生产环境移除console */
const isDropConsole = false

// 三.webpack配置
/** css通用loader */
const cssLoader = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2, // css中通过import引入的文件，也要先执行sass-loade + postcss-loader
      modules: isCssModules // css模块化
    }
  },
  'postcss-loader',
  'sass-loader'
]

/** 基础配置 */
const baseConfig = {
  performance: {
    hints: false // 关闭webpack打包警告（例如某个资源超过250kb）
  },
  cache: {
    type: 'filesystem' // webpack使用磁盘缓存
  },
  entry: {
    index: `${entryPath}/index.ts`
  },
  output: {
    path: outputPath
  },
  externals: {
    // jquery: 'jQuery' // 忽略import引入第三方模块，例如通过cdn引入jQuery
  },
  resolve: {
    // 路径别名：js -> '@/'、css -> '~@/'
    alias: {
      '@example': entryPath,
      '@scss': scssEntryPath,
      crypto: false // webpack5中移除了nodejs核心模块的polyfill自动引入，需要手动引入
    },
    // 默认扩展名：.js必须存在，否则node_modules中的文件无法解析
    extensions: ['.ts', '.js', '.vue']
  },
  plugins: [
    new DefinePlugin({
      PROJECT_ENV: JSON.stringify(process.env.NODE_ENV), // 项目环境
      PROJECT_VERSION: JSON.stringify(require('./package.json').version), // 项目版本号
      PROJECT_BUILDTIME: JSON.stringify(`${new Date()}`), // 项目构建时间
      __VUE_OPTIONS_API__: false, // vue3关闭 options api：https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      __VUE_PROD_DEVTOOLS__: false // vue3在生产环境中禁用 devtools 支持
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        outputPath // build前清空目录
      ]
    }),
    new HtmlWebpackPlugin({
      template: `${entryPath}/index.html`, // html模板位置
      favicon: `${entryPath}/favicon.ico`, // favicon位置
      filename: `index.html`, // html生成模板名
      chunks: [`index`], // 匹配entry的key
      title: `${require('./package.json').name}`, // html标题
      meta: {
        viewport:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover', // html自适应移动端
        renderer: 'webkit', // 360等国产浏览器强制开启webkit内核渲染
        'format-detection': 'telephone=no, email=no', // 移动端浏览器忽略自动识别电话和邮箱
        description: `${require('./package.json').description}` // html描述
      },
      minify: {
        removeComments: true, // html删除注释
        collapseWhitespace: true // html删除空白符与换行符
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // scss源代码拷贝到dist
          from: scssEntryPath, // 指定要拷贝的文件夹
          to: distPath // 拷贝到dist目录下
        },
        {
          // scss构建产物拷贝到dist
          from: `${scssOutputPath}/index.css`,
          to: distPath
        },
        {
          // scss构建产物拷贝到dist-example
          from: `${scssOutputPath}/index.css`,
          to: outputPath
        }
      ]
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp|svg)$/,
        type: 'asset',
        generator: {
          filename: `image/${hashRule}[ext]`
        },
        parser: {
          dataUrlCondition: {
            maxSize: 0 * 1024 // 0kb以下base64发送（asset/inline）、0kb以上url发送（asset/resource）
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|fnt)$/,
        type: 'asset/resource', // url发送
        generator: {
          filename: `font/${hashRule}[ext]`
        }
      },
      {
        test: /\.(mp3|mp4|wav)$/,
        type: 'asset/resource', // url发送
        generator: {
          filename: `media/${hashRule}[ext]`
        }
      },
      {
        test: /\.(json|xml)$/,
        type: 'asset/resource', // url发送
        generator: {
          filename: `file/${hashRule}[ext]`
        }
      }
    ]
  },
  optimization: {
    usedExports: true, // 开启tree shaking
    splitChunks: {
      chunks: 'all', // 对同步 + 异步引入的js开启code splitting
      cacheGroups: {
        // vendors组规则：node_modules中文件使用
        vendor: {
          test: /node_modules/,
          name: 'node_modules',
          priority: 1, // 拆分权重：优先级1
          minSize: 0 * 1024, // 拆分最小体积（进行拆分js文件的最小体积）：>=0kb拆分
          minChunks: 1 // 拆分最小复用（进行拆分js文件的最少import次数）：>=1次拆分
        },
        // common组规则
        common: {
          name: 'common',
          priority: 0, // 优先级0
          minSize: 0 * 1024, // >=0kb拆分
          minChunks: 2 // >=2次拆分
        }
      }
    }
  }
}

/** 开发环境配置 */
const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: outputPath // 静态文件目录
    },
    historyApiFallback: true, // 支持单页应用history路由fallback
    port: 3000, // 启动端口号
    open: false, // 禁止自动打开浏览器
    hot: false, // 开启热模块重载功能hmr
    compress: true, // 开启gzip压缩
    client: {
      overlay: true, // 在浏览器显示编译错误
      progress: false // 在浏览器打印编译进度
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', ...cssLoader]
      }
    ]
  }
}

/** 生产环境配置 */
const prodConfig = {
  mode: 'production',
  devtool: isSourceMap ? 'hidden-source-map' : false,
  output: {
    publicPath: './',
    filename: `js/${hashRule}.js`
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${hashRule}.css`,
      chunkFilename: `css/${hashRule}.chunk.css`
    }),
    new CompressionWebpackPlugin({
      test: /\.(html|css|js)$/, // 匹配文件类型
      algorithm: 'gzip', // 压缩算法
      threshold: 0 * 1024, // gzip压缩大小阈值（kb）：文件大小>0kb执行压缩
      minRatio: 0.8, // gzip压缩比率阈值（%）：文件压缩阈值<0.8执行压缩
      deleteOriginalAssets: false, // 不删除原始文件
      filename: '[path][base].gz' // gizp生成文件名
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false, // 是否启动本地服务
      analyzerPort: 3001, // 本地服务端口号：http://localhost:3001
      analyzerMode: 'static', // 只输出静态html文件
      reportFilename: 'analyzer.html', // 分析文件名称
      reportTitle: 'Webpack打包分析结果'
    }),
    new GenerateSW({
      swDest: 'sw.js', // serviceWorker生成文件名
      clientsClaim: true, // sw.js立即接管
      skipWaiting: true, // 跳过serviceWorker等待，新sw.js安装成功后立即接管网站
      cleanupOutdatedCaches: true // 尝试删除老版本缓存
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // css中引入的第三方资源（图片、字体）路径修正
            }
          },
          ...cssLoader
        ]
      }
    ]
  },
  optimization: {
    minimize: true, // 开启压缩
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 开启多进程压缩js
        terserOptions: {
          compress: {
            drop_console: isDropConsole, // 删除console
            drop_debugger: true // 删除debugger
          }
        }
      }),
      new CssMinimizerWebpackPlugin({
        parallel: true // 开启多进程压缩css
      })
    ]
  }
}

module.exports = merge(
  baseConfig,
  process.env.NODE_ENV === 'dev' ? devConfig : prodConfig
)
