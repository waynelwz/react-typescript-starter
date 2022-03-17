const path = require('path')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const CracoEsbuildPlugin = require('craco-esbuild');
const CracoAlias = require('craco-alias');

module.exports = {
    plugins: [
        { plugin: CracoEsbuildPlugin },
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: '.',
                tsConfigPath: "./tsconfig.paths.json"
            }
        }
    ],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        plugins: [new SimpleProgressWebpackPlugin()],
        configure: (webpackConfig, { env, paths }) => {
            // https://github.com/pmndrs/react-spring/issues/1078#issuecomment-752143468
            webpackConfig.module.rules.push({
                test: /react-spring/,
                sideEffects: true,
            })
            return webpackConfig
        }
    }
}
