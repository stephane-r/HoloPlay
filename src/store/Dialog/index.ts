import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { CustomInstance, Video } from '../../types';

export interface DialogState {
  dialogAddVideoToPlaylist: {
    isOpen: boolean;
    video: null | Video;
  };
}

const dialogState: DialogState = {
  dialogAddVideoToPlaylist: {
    isOpen: false,
    video: null
  }
};

const dialogActions = {
  setVideoDialogAddVideoToPlaylist: (
    store: Store,
    actions: any,
    video: Video
  ) => {
    return {
      ...store,
      dialogAddVideoToPlaylist: {
        ...store.dialogAddVideoToPlaylist,
        video,
        isOpen: true
      }
    };
  },
  toggleDialogAddVideoToPlaylist: (store: Store) => {
    return {
      ...store,
      dialogAddVideoToPlaylist: {
        ...store.dialogAddVideoToPlaylist,
        isOpen: !store.dialogAddVideoToPlaylist.isOpen
      }
    };
  }
};

export { dialogState, dialogActions };
