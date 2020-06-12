const formatTimeUnit = (input: string, unit: string): string => {
  const index: number = input.indexOf(unit);
  const output = '00';

  if (index < 0) {
    return output;
  }

  // @ts-ignore
  if (isNaN(input.charAt(index - 2))) {
    return '0' + input.charAt(index - 1);
  }

  return input.charAt(index - 2) + input.charAt(index - 1);
};

export default formatTimeUnit;
