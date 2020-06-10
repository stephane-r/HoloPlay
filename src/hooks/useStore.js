import { getState } from '../store';

const useStore = () => {
  const store = getState();

  return store;
};

export default useStore;
