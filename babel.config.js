module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@contexts': './src/contexts',
          '@interfaces': './src/interfaces',
          '@services': './src/services',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@mocks': './src/mocks',
          '@styles': './src/styles',
          '@navigations': './src/navigations',
        },
      },
    ],
  ],
};
