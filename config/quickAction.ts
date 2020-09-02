export const QUICK_ACTION_PLAYLISTS = 'Playlists';
export const QUICK_ACTION_FAVORIS = 'Favoris';
export const QUICK_ACTION_SEARCH = 'Search';

export const quickActionShortcutItems = [
  {
    type: 'Orders',
    title: QUICK_ACTION_PLAYLISTS,
    icon: 'headset',
    userInfo: {
      url: 'app://playlists'
    }
  },
  {
    type: 'Orders',
    title: QUICK_ACTION_FAVORIS,
    icon: 'favorite',
    userInfo: {
      url: 'app://favoris'
    }
  },
  {
    type: 'Orders',
    title: QUICK_ACTION_SEARCH,
    icon: 'search',
    userInfo: {
      url: 'app://search'
    }
  }
];
