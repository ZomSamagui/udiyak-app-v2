module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver', // 경로 별칭 사용 설정
                {
                    root: ['./src'], // src 디렉토리를 루트로 설정
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
                        'src': './',
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
