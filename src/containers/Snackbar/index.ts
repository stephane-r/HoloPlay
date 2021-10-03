import { connect, Store } from '../../store';
import Snackbar from '../../components/Snackbar';

const SnackbarContainer = connect(({ snackbar }: Store) => ({
  snackbar
}))(Snackbar);

export default SnackbarContainer;
