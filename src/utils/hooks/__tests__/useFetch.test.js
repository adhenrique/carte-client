import { act, renderHook } from '@testing-library/react-hooks';
import { useFetch } from '@utils/hooks/useFetch';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const Service = () => {
  const list = async (slug) => Promise.resolve({ data: slug });
  const listWithThrow = async () => Promise.reject(new Error());

  return { list, listWithThrow };
};

describe('Use Fetch', () => {
  it('should fetch from an API and get data', async () => {
    const testSlug = '';

    const { result } = renderHook(() => useFetch(Service()));

    expect(result.current.data).toBeUndefined();

    await act(() => sleep(100));

    expect(result.current.data).toEqual(testSlug);
  });

  it('should throw fetch from an API', async () => {
    const testSlug = 'yay';

    const { result } = renderHook(() =>
      useFetch(Service(), 'listWithThrow', testSlug),
    );
    expect(result.current.error).toBeUndefined();

    await act(() => sleep(100));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toMatchObject({});
  });
});
