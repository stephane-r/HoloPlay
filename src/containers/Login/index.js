import { connect } from '../../store';
import LoginForm from '../../screens/Login/form';

const LoginFormContainer = connect(({ loginIsFecthing }) => ({
  loginIsFecthing
}))(LoginForm);

export default LoginFormContainer;
