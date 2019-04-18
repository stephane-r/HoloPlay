const api = {
  register: '/auth/local/register',
  login: '/auth/local',
  forgottenPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  me: '/users/me',
  update: _id => `/users/${_id}`
};

export default api;
