import { connect } from '../../store';
import DialogEditUser from '../../components/Dialog/EditUser';

const DialogEditUserEmailContainer = connect(({ user }) => {
  return {
    title: 'Edit your email',
    label: 'Email',
    value: user.email,
    onSubmit: () => alert('on submitt')
  };
})(DialogEditUser);

export default DialogEditUserEmailContainer;
