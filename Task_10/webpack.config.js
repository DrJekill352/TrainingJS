module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bild.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}