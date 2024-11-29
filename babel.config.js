module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    extensions: [
                        '.js',
                        '.jsx',
                        '.ts',
                        '.tsx',
                        '.json',
                    ],
                    alias: {
                        navigation: './navigation',
                        assets: './assets',
                        components: './components',
                        constants: './constants',
                        hooks: './hooks',
                        lib: './lib',
                        screens: './screens',
                        type: './type'
                    }
                },
            ],
            [
                'module:react-native-dotenv',
                {
                    path: '.env',
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
