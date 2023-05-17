const { merge } = require('webpack-merge');

const path = require('path');
const common = require('./webpack.config.js');

const developerConfig = {
	module: {
		rules: [
            // SCSS, CSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
		],
	},
    devServer: {
        static: {
            directory: path.join(__dirname, "../dist")
        },
        historyApiFallback: true,
        compress: true,
        port: 3000,
        open: true,
        hot: true
    }
};

module.exports = (env) => {
    return merge(common(env), developerConfig);
};
