module.exports = {
  // Default test environment, can be overridden by projects
  testEnvironment: 'node',

  // Pattern to find test files
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/__tests__/**/*.spec.js'
  ],

  // Define separate projects for different test environments
  projects: [
    {
      displayName: 'backend', // Name for this project
      testMatch: [
        // Match test files specifically for backend (e.g., db models, server logic)
        '**/__tests__/db/**/*.test.js',
        '**/__tests__/db/**/*.spec.js',
      ],
      testEnvironment: 'node', // Use Node.js environment for backend tests
    },
    {
      displayName: 'frontend', // Name for this project
      testMatch: [
        // Match test files specifically for frontend (e.g., public/script.js)
        '**/__tests__/public/**/*.test.js',
        '**/__tests__/public/**/*.spec.js',
      ],
      testEnvironment: 'jsdom', // Use JSDOM environment for frontend tests
    },
  ],
};
