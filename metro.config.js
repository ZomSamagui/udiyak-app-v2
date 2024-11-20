const path = require('path');

module.exports = {
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
    },
    watchFolders: [
        path.resolve(__dirname, 'src'),
    ],
};
