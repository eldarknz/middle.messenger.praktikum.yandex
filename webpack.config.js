// https://habr.com/ru/articles/524260/
// https://habr.com/ru/articles/701724/

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {

    const isDev     = Boolean(env.development);
    const sourceMap = isDev;

    return {

        // Режим
        mode: isDev ? "development" : "production",

        // Для генерации source-map
        devtool: sourceMap ? "source-map" : false,

        // Точка входа
        entry: {
            main: path.resolve(__dirname, "./src/index.ts")
        },

        // Точка выхода
        output: {
            filename: "[name].[hash].js",
            path: path.resolve(__dirname, "./dist")
        },

        // Разрешения
        resolve: {
            extensions: [".ts", ".js", ".json"],
            alias: {
                handlebars: "handlebars/dist/handlebars.min.js",
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

        // Модули
        module: {
            rules: [
                // TS
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                configFile: path.resolve(
                                    __dirname, 
                                    isDev ? "./tsconfig.json" : "./tsconfig.prod.json"
                                )
                            }
                        }
                    ],
                    exclude: /(node_modules)/
                },
                // SCSS, CSS
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        //"style-loader",
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ],
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
