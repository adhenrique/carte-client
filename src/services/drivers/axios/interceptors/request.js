const reqSuccess = (req) => req;
const reqError = (err) => Promise.reject(err);

export { reqSuccess, reqError };
