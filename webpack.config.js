const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        'pre-hook': './src/pre-hook.js',
        'impactmoduled': './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].min.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
