import '@testing-library/jest-dom'

// specific tests
process.env = Object.assign(process.env, {
  NODE_ENV: 'test',
  AUTH_COOKIE_NAME: 'authcookiename',
});
