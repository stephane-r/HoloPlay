import { connect } from '../../store';
import App from '../../components/App';

const AppContainer = connect(({ darkMode }) => ({
  darkMode
}))(App);

export default AppContainer;
