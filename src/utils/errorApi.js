// @flow
const FAILURE_API = 'error';
const SUCCESS_API = 'success';

type Args = {
  statusCode: Number,
  message: String
};

const errorApi = (response: Args): Object => {
  const error: Object = new Error(response.message);
  error.statusCode = response.statusCode;
  return error;
};

export { FAILURE_API, SUCCESS_API };
export default errorApi;
