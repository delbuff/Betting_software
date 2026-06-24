const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: './src/main.tsx',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,

        proxy: [
            {
                context: ['/api'],
                target: 'https://belparyaj.com',
                changeOrigin: true,
                secure: false,
                pathRewrite: (path) => path.replace('/api', ''),
            },
        ],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
}