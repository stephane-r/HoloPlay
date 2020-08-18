import useFetch from 'fetch-suspense';
import useStore from './useStore';
import { SearchVideo } from '../types';
import useInvidiousInstances from './useInvidiousInstances';

const useCallApi = (url: string): SearchVideo[] => {
  const store = useStore();
  const { instances } = useInvidiousInstances();
  const data = useFetch(`${store.instance ?? instances[0].uri}/api/v1/${url}`);

  return data;
};

export default useCallApi;
