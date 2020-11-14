const hex2rgba = (hex: string, alpha: number = 1): string => {
  const hexMatch = hex.match(/\w\w/g);

  if (hexMatch) {
    const [r, g, b] = hexMatch.map((x) => parseInt(x, 16));

    return `rgba(${r},${g},${b},${alpha})`;
  }

  return 'rgba(0, 0, 0, 0.3)';
};

export default hex2rgba;
