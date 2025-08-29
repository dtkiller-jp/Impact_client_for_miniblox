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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
