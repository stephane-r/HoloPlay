const FAILURE_API = 'error';
const SUCCESS_API = 'success';

interface Args {
  statusCode: number;
  message: string;
}

const errorApi = (response: Args): Error => {
  const error = new Error(response.message);
  // @ts-ignore
  error.statusCode = response.statusCode;
  return error;
};

export { FAILURE_API, SUCCESS_API };
export default errorApi;
