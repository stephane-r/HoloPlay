import useFetch from 'fetch-suspense';
import useStore from './useStore';
import { SearchVideo } from '../types';

const useCallApi = (url: string): SearchVideo[] => {
  const store = useStore();
  const data = useFetch(`${store.instance}/api/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  });

  // @ts-ignore
  return data;
};

export default useCallApi;
