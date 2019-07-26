import { connect } from '../../store';
import Profil from '../../components/Profil';

const ProfilContainer = connect(({ userId }) => ({
  userId
}))(Profil);

export default ProfilContainer;
