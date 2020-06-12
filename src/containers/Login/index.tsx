import { connect, Store } from '../../store';
import LoginForm from '../../screens/Login/form';

const LoginFormContainer = connect(({ loginIsFetching }: Store) => ({
  loginIsFetching
}))(LoginForm);

export default LoginFormContainer;
