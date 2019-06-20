import { connect } from '../../store';
import Snackbar from '../../components/Snackbar';

const SnackbarContainer = connect(({ flashMessage }) => ({
  flashMessage
}))(Snackbar);

export default SnackbarContainer;
