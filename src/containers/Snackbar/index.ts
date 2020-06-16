import { connect, Store } from '../../store';
import Snackbar from '../../components/Snackbar';

const SnackbarContainer = connect(({ flashMessage }: Store) => ({
  flashMessage
}))(Snackbar);

export default SnackbarContainer;
