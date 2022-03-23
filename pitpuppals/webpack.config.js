var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js', 
    output : {
               path : path.resolve(__dirname,'dist'),
               filename : 'PPP_bundle.js',
               library: 'pitpuppals',
               libraryTarget: 'umd'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath: "fonts/"
                    }
                  }
                ]
              }
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ] 
}