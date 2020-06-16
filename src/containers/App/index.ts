import { connect, Store } from '../../store';
import App from '../../components/App';

const AppContainer = connect(({ darkMode }: Store) => ({
  darkMode
}))(App);

export default AppContainer;
