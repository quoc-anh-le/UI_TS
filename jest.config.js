module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
    },
  };
  