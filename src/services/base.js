import { axios as client } from './drivers';

const Service = (resource = '') => {
  function sanitizeUrl(slug) {
    return slug ? `${resource}/${slug}` : resource;
  }

  const get = async (id, options) => client.get(sanitizeUrl(id), options);
  const list = async (slug, options) => client.get(sanitizeUrl(slug), options);
  const store = async (slug, body, options) =>
    client.post(sanitizeUrl(slug), body, options);
  const update = async (id, body, options) =>
    client.put(sanitizeUrl(id), body, options);
  const destroy = async (id, options) =>
    client.delete(sanitizeUrl(id), options);

  return {
    get,
    list,
    store,
    update,
    destroy,
  };
};

export default Service;
