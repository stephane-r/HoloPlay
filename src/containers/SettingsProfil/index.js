import { connect } from '../../store';
import SettingsProfil from '../../components/Settings/Profil';

const SettingsProfilContainer = connect(({ user }) => ({
  user
}))(SettingsProfil);

export default SettingsProfilContainer;
