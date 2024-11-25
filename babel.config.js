module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
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
                        '.svg',
                        '.png',
                        '.jpg',
                    ],
                    alias: {
                        navigation: './Navigation',
                        assets: './Assets',
                        components: './Components',
                        constants: './Constants',
                        hooks: './Hooks',
                        lib: './Lib',
                        screens: './Screens',
                        type: './Type'
                    }
                },
            ],
            [
                'module:react-native-dotenv',
                {
                    moduleName: 'react-native-dotenv',
                    path: '.env',
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
