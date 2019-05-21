import { connect } from '../../store';
import Profil from '../../components/Profil';

const ProfilContainer = connect(({ user }) => ({
  user
}))(Profil);

export default ProfilContainer;
