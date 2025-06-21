module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
      },
    }],
    ['@babel/preset-react', {
      runtime: 'automatic',
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: false,
      },
    ],
  ],
}; 