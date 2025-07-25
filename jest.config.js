
export default {
  testEnvironment: 'node',
  detectOpenHandles: true,
  transform: {}, // disable Babel
  setupFilesAfterEnv: ['./tests/setup.js'],
};

