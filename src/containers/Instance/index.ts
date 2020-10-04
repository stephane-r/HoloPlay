import { connect, Store } from '../../store';
import Instance from '../../components/Instance';

const InstanceContainer = connect(({ instance }: Store) => ({
  instance
}))(Instance);

export default InstanceContainer;
