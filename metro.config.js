const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
    const defaultConfig = await getDefaultConfig(__dirname);

    defaultConfig.resolver.assetExts = [
        ...defaultConfig.resolver.assetExts,
        'png',  // 명시적으로 png 추가
        'jpg',
        'jpeg',
        'svg',
        'otf'
    ];

    defaultConfig.resolver.sourceExts = [
        ...defaultConfig.resolver.sourceExts,
        'svg'
    ];

    return defaultConfig;
})();
