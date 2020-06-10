import useFetch from 'fetch-suspense';
import useStore from './useStore';

const useCallApi = url => {
  const store = useStore();
  const data = useFetch(`${store.instance}/api/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  });

  return data;
};

export default useCallApi;
