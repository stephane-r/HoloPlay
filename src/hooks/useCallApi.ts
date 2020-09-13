import useFetch from 'fetch-suspense';
import { SearchVideo } from '../types';

const useCallApi = (
  instance: string,
  url: string,
  slice: number = 40
): SearchVideo[] => {
  const data = useFetch(`${instance}/api/v1/${url}`);

  return {
    data: Array.isArray(data) ? data.slice(0, slice) : []
  };
};

export default useCallApi;
