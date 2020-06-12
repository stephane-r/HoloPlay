import formatTimeUnit from './formatTimeUnit';

const ISO8601toDuration = (input: string): string => {
  const M = formatTimeUnit(input, 'M');
  const S = formatTimeUnit(input, 'S');
  let H = formatTimeUnit(input, 'H');

  if (H == '00') {
    H = '';
  } else {
    H += ':';
  }

  return H + M + ':' + S;
};

export default ISO8601toDuration;
