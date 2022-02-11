import { Instance } from "../types";

const INSTANCE_INVIDIOUS_URL = "https://instances.invidio.us/instances.json";

const fetchInvidiousInstances = async (): Promise<Instance[]> => {
  const request = await fetch(INSTANCE_INVIDIOUS_URL);
  const data = await request.json();
  let instances: Instance[] = [];

  data.forEach((instance) => {
    instances = [...instances, instance[1]];
  });

  return instances;
};

export default fetchInvidiousInstances;
