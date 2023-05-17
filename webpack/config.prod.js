const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.js');

const prodConfig = {
	module: {
		rules: [
            // SCSS, CSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
		],
	},
	plugins: [
        new MiniCssExtractPlugin({
            filename: "style-[hash].css",
        }),
	],
};

module.exports = (env) => {
    return merge(common(env), prodConfig);
};
