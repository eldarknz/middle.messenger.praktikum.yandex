// https://habr.com/ru/articles/524260/

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*const common = require("./webpack.config.js");

const prodConfig = {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
				exclude: /(node_modules)/,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
	],
};*/

/*const developerConfig = {
	mode: "development",
	devServer: {
		static: {
			directory: path.join(__dirname, "../dist"),
		},
		historyApiFallback: true,
		compress: true,
		port: 4000,
		open: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
};*/

module.exports = () => {
    return {
        // Точка входа
        entry: {
            main: path.resolve(__dirname, "./src/index.ts"),
        },

        // Точка выхода
        output: {
            filename: "[name].[fullhash].js",
            path: path.resolve(__dirname, "./dist"),
        },

        resolve: {
            extensions: [".ts", ".js", ".json"],
            alias: {
                "@components": path.resolve(__dirname, "src/components/"),
                "@core": path.resolve(__dirname, "src/core"),
                "@utils": path.resolve(__dirname, "src/utils"),
                "@mock": path.resolve(__dirname, "src/mock"),
                "@modules": path.resolve(__dirname, "src/modules"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@styles": path.resolve(__dirname, "src/styles"),
                "@custom_types": path.resolve(__dirname, "src/types"),
                "@utils": path.resolve(__dirname, "src/utils"),
                "@api": path.resolve(__dirname, "src/core/api"),
                "@config": path.resolve(__dirname, "src/core/config"),
                "@controllers": path.resolve(__dirname, "src/core/controllers"),
                "@router": path.resolve(__dirname, "src/core/router"),
                "@store": path.resolve(__dirname, "src/core/store")
            }
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                configFile: path.resolve(
                                    __dirname,
                                    "./tsconfig.json",
                                ),
                            },
                        },
                    ],
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                      {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                      },
                      "style-loader",
                      "css-loader",
                      "postcss-loader",
                      "sass-loader",
                    ],
                  }
            ]
        },

        // Плагины
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./static/index.html"),
                filename: "index.html",
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                }
            }),
            new MiniCssExtractPlugin({
                filename: "style-[hash].css",
            }),
        ],

        // Модули
        module: {
            rules: [
                // css, sass, scss
                {
                    test: /\.scss$/i,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                // изображения
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: "asset/resource",
                },
                // шрифты и SVG
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: "asset/inline",
                },
            ],
        },

        devServer: {
            static: {
                directory: path.join(__dirname, "./dist")
            },
            compress: true,
            port: 3000,
            open: true,
            hot: true
        }
    };
}
