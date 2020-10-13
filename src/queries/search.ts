import { getState, Store } from "../store";
import { SearchVideo } from "../types";

const search = async (url: string): Promise<SearchVideo[]> => {
  const store: Store = getState();
  const request = await fetch(`${store.instance}/api/v1/${url}`);
  const result = await request.json()

  return Array.isArray(result) ? result.slice(0, 20) : [];
}

export default search;
