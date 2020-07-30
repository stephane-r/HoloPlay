import { connect, Store } from '../../store';
import Profil from '../../components/Profil';

const ProfilContainer = connect(({ username }: Store) => ({
  username
}))(Profil);

export default ProfilContainer;
