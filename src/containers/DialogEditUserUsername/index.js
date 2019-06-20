import { connect } from '../../store';
import DialogEditUser from '../../components/Dialog/EditUser';

const DialogEditUserUsernameContainer = connect(({ user }) => {
  return {
    title: 'Edit your username',
    label: 'Username',
    value: user.username,
    onSubmit: () => alert('subit')
  };
})(DialogEditUser);

export default DialogEditUserUsernameContainer;
