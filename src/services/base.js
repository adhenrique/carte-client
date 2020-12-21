import { axios as client } from './drivers';

const Service = (resource = '') => {
  function sanitizeUrl(slug) {
    return slug ? `${resource}/${slug}` : resource;
  }

  const get = async (slug, options) => client.get(sanitizeUrl(slug), options);
  const list = async (slug, options) => client.get(sanitizeUrl(slug), options);
  const store = async (slug, body, options) =>
    client.post(sanitizeUrl(slug), body, options);
  const update = async (slug, body, options) =>
    client.put(sanitizeUrl(slug), body, options);
  const destroy = async (slug, options) =>
    client.delete(sanitizeUrl(slug), options);

  return {
    get,
    list,
    store,
    update,
    destroy,
  };
};

export default Service;
