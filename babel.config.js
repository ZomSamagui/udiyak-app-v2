module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                    alias: {
                        navigation: './navigation',
                        assets: './assets',
                        components: './components',
                        constants: './constants',
                        hooks: './hooks',
                        lib: './lib',
                        screens: './screens',
                        type: './type',
                    },
                },
            ],
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
