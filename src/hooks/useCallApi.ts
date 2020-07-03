import useFetch from 'fetch-suspense';
import useStore from './useStore';
import { SearchVideo } from '../types';
import { PUBLIC_INVIDIOUS_INSTANCES } from '../constants';

const useCallApi = (url: string): SearchVideo[] => {
  const store = useStore();
  const data = useFetch(
    `${store.instance ?? PUBLIC_INVIDIOUS_INSTANCES[0].value}/api/v1/${url}`
  );

  return data;
};

export default useCallApi;
