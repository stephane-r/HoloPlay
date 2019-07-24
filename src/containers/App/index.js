import { connect } from '../../store';
import App from '../../components/App';

const AppContainer = connect(({ darkMode, userId }) => ({
  darkMode,
  userId
}))(App);

export default AppContainer;
