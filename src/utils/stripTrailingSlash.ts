const stripTrailingSlash = (str: string): string =>
  str.endsWith('/') ? str.slice(0, -1) : str;

export default stripTrailingSlash;
