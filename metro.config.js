const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // SVG 변환기를 설정
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), // SVG를 asset에서 제외
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // SVG를 소스 확장자로 추가
  },
};

module.exports = mergeConfig(defaultConfig, config);
