import { SearchVideo } from "../types";

const search = async (
  slug: string,
  instance: string
): Promise<SearchVideo[]> => {
  const url = `${instance}/api/v1/${slug}`;
  const request = await fetch(url);
  const result = await request.json();

  return Array.isArray(result) ? result.slice(0, 20) : [];
};

export default search;
