const webpack = require('webpack');
const { version } = require('./package.json');

const config = require('./webpack.config');

config.mode = 'production';
config.plugins.push(
    new webpack.BannerPlugin({
        banner: `[file] v${version}\nhttps://github.com/TechSupportIq/WebchatWidget/tree/v${version}\nhttps://github.com/TechSupportIq/WebchatWidget/tree/v${version}/OSS_LICENSES.txt`
    })
)


module.exports = config;