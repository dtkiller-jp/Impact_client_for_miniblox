const path = require("path");

module.exports = {
    mode: "production",
    entry: {
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
