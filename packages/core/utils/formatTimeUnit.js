const formatTimeUnit = (input, unit) => {
  const index = input.indexOf(unit);
  const output = '00';

  if (index < 0) {
    return output;
  }

  if (isNaN(input.charAt(index - 2))) {
    return '0' + input.charAt(index - 1);
  }

  return input.charAt(index - 2) + input.charAt(index - 1);
};

export default formatTimeUnit;
