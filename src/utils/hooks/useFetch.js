import useSWR from 'swr';

function useFetch(service, method = 'list', slug = '') {
  const { data, error, mutate } = useSWR('useFetchId', async () => {
    const response = await service[method](slug);
    return response.data;
  });

  return { data, error, mutate };
}

export { useFetch };
