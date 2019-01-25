import { connect } from '@youtube-audio-player/core';
import Dashboard from '../../screens/Dashboard';

const DashboardContainer = connect(({ isConnected }) => {
  return {
    isConnected
  };
})(Dashboard);

export default DashboardContainer;
