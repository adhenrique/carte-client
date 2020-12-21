import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const APIServiceContext = createContext();
const APIServiceProvider = ({ service, children }) => (
  <APIServiceContext.Provider value={{ service }}>
    {children}
  </APIServiceContext.Provider>
);

const useApiService = (resource = '') => {
  const context = useContext(APIServiceContext);
  if (!context) {
    throw new Error('useApiService must be used within a APIServiceProvider');
  }

  return context.service(resource);
};

APIServiceProvider.propTypes = {
  service: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.node,
  ]),
};

export { APIServiceProvider, useApiService };
