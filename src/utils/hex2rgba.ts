const hex2rgba = (hex: string, alpha: number = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));

  return `rgba(${r},${g},${b},${alpha})`;
};

export default hex2rgba;
