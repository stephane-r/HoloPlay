import { SearchVideo } from '../types';

const search = async (
  url: string,
  instance: string
): Promise<SearchVideo[]> => {
  const request = await fetch(`${instance}/api/v1/${url}`);
  const result = await request.json();

  return Array.isArray(result) ? result.slice(0, 20) : [];
};

export default search;
