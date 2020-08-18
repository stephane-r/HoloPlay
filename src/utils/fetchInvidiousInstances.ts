import { Instance } from '../types';

const fetchInvidiousInstances = (): Promise<Instance[]> =>
  fetch('https://instances.invidio.us/instances.json')
    .then((response) => response.json())
    .then((result) => {
      let instances = [];

      result.forEach((instance) => {
        instances = [...instances, instance[1]];
      });

      return instances;
    });

export default fetchInvidiousInstances;
