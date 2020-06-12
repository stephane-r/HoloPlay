import { getState, Store } from '../store';

const useStore = (): Store => {
  const store = getState();
  return store;
};

export default useStore;
