const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
    path.resolve(__dirname, 'src/svg/'),
    require.resolve('antd').replace(/index\.js$/, '')
]

// get back api
const apiUrl = 'http://127.0.0.1:5000/'

export default {
    entry: 'src/index.js',
    svgSpriteLoaderDirs: svgSpriteDirs,
    theme: "./theme.config.js",
    publicPath: `/${version}/`,
    outputPath: `./dist/${version}`,
    // 接口代理示例
    proxy: {
        // "/api/v1/users": {
        //     "target": apiUrl,
        //     "changeOrigin": true
        // }, "/auth/oauth2/token": {
        //     "target": apiUrl,
        //     "changeOrigin": true
        // }
    },
    env: {
        development: {
            extraBabelPlugins: [
                "dva-hmr",
                "transform-runtime",
                [
                    "import", {
                    "libraryName": "antd",
                    "style": true
                }
                ]
            ]
        },
        production: {
            extraBabelPlugins: [
                "transform-runtime",
                [
                    "import", {
                    "libraryName": "antd",
                    "style": true
                }
                ]
            ]
        }
    },
    dllPlugin: {
        exclude: ["babel-runtime", "roadhog", "cross-env"],
        include: ["dva/router", "dva/saga", "dva/fetch"]
    }
}