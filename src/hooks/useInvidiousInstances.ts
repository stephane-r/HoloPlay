import { Instance } from '../types/Api';
import { useState, useEffect } from 'react';
import fetchInvidiousInstances from '../utils/fetchInvidiousInstances';

interface UseInvidiousInstancesHook {
  instances: Instance[];
}

const useInvidiousInstances = (): UseInvidiousInstancesHook => {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    fetchInvidiousInstances().then(setInstances);
  }, []);

  return {
    instances
  };
};

export default useInvidiousInstances;
