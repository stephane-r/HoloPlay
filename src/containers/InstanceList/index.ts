import InstanceList from '../../components/InstanceList';
import { connect, Store } from '../../store';

const InstanceListContainer = connect(({ customInstances }: Store) => ({
  customInstances
}))(InstanceList);

export default InstanceListContainer;
