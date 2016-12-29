let webpack = require('webpack');

module.exports = (env={}) => {

    let styleLoaders, babelPresets;

    let config = {
        entry: {
            root: './modules/index.js'
        },
        output: {
            path:     'static',
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: babelPresets = [
                                    ['es2015', { modules: false }],
                                    'stage-0'
                                ]
                            }
                        }
                    ]
                },
                styleLoader = {
                    test: /\.scss/,
                    use: [
                        { loader:'style-loader' },
                        { loader:'css-loader?modules&localIdentName=[hash:base64:5]' },
                        { loader:'sass-loader' },
                        { loader:'import-glob-loader' },
                    ]
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: env.dev
            }),
            new webpack.ProvidePlugin({
                PIXI: 'pixi.js'
            }),
        ]
    }

    if (env.devServer) {
        config.output.path = '/';

        config.devServer = {
            contentBase: __dirname + '/templates'
        };
    }
    
    if (env.esLint || env.dev) {
        config.module.rules.push({
            test: /\.js$/,
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                configFile: '.eslintrc',
                failOnWarning: false,
                failOnError: false,
                emitError: false,
                fix: true
            }
        })

        config.devtool = 'source-map';
    }

    return config;
};