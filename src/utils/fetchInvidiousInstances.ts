import { Instance } from '../types';

interface Result {
  [index: number]: string | Instance;
}

const fetchInvidiousInstances = (): Promise<Instance[]> =>
  fetch('https://instances.invidio.us/instances.json')
    .then((response) => response.json())
    .then((result: Result[]) => {
      let instances: Instance[] = [];

      result.forEach((instance: Result) => {
        instances = <Instance[]>[...instances, instance[1]];
      });

      return instances;
    });

export default fetchInvidiousInstances;
