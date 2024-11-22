const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
    const defaultConfig = await getDefaultConfig(__dirname);

    defaultConfig.transformer = {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    };

    defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');

    defaultConfig.resolver.sourceExts = [
        ...defaultConfig.resolver.sourceExts,
        'svg'
    ];

    defaultConfig.resolver.assetExts.push('otf', 'png', 'jpg', 'jpeg');

    return defaultConfig;
})();
