import useFetch from 'fetch-suspense';
import useStore from './useStore';
import { SearchVideo } from '../types';

const useCallApi = (url: string, slice: number = 40): SearchVideo[] => {
  const store = useStore();
  const data = useFetch(
    `${store.instance ?? 'https://invidio.us/'}/api/v1/${url}`
  );

  return {
    data: data.slice(0, slice)
  };
};

export default useCallApi;
