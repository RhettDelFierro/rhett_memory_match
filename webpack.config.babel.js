import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});

//just points to app and build directory. Will modify our entry to use these.
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'dist'),
    assets: path.join(__dirname, 'app/assets')
};

//to figure out if we are in a production build or development build:
const LAUNCH_COMMAND = process.env.npm_lifecyle_event;

// if npm run production (webpack -p), LAUNCH_COMMAND = 'production'.
// npm run start makes LAUNCHCOMMAND === 'start'
const isProduction = LAUNCH_COMMAND === 'production';

//need to inform our .babelrc file whether we are in production or development mode (for hot module replacement).
//don't forget to add the env property to .babelrc:
process.env.BABEL_ENV = LAUNCH_COMMAND


//however to tell REACT to run in production mode, process.env.NODE_ENV must be set to "production".
//then include this variable in our plugins to tell React we are in production mode.
const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})



//*******************DO NOT FORGET TO CHANGE THE package.json FILE TO CHANGE main: to index.js.
//configurations for development and production builds. Shared.
const base = {
    entry: [
        'babel-polyfill',
        PATHS.app
    ],
    output: {
        path: PATHS.build,
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            //the css modules need the source map so your components can have individual style sheets.
            {test: /\.css$/, loader: "style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]"},
            {test: /\.(png|jpg)$/, loader: 'url?limit=25000000'}, //anything to the right of the '?' in the 'loader' key can also be placed in a 'query' parameter as key:value pairs. That way it'll just be loader: url.
            {test: /\.mp3$/, loader: 'file?name=[path][name].[ext]'}
            //{ test: /\.png$/, loader: "url-loader?limit=100000"}
            //{test: /\.png$/, loader: 'url-loader?limit=100000'}
        ]
    },
    //allows to not use relative path directories, just the direct path from the value..
    resolve: {
        root: path.resolve('./app')
    }
};

//config "npm run start"
const developmentConfig = {
    //devtool: takes care of going to the file with the error in dev tools rather than the minifed version.
    devtool: 'cheap-module-inline-source-map',
    //hot module reloading, don't forget ot npm install babel-preset-react-hmre and change the .babelrc:
    devServer: {
        contentBase: PATHS.build,
        hot: true,
        inline: true,
        progress: true
    },
    //2nd plugin is an instance of webpack to use hmre
    plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
};

//config "npm run production"
const productionConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [HtmlWebpackPluginConfig, productionPlugin]
};

//change file name to use .assign()
export default Object.assign({}, base,
    isProduction === true ? productionConfig : developmentConfig
)