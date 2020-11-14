import callApi from './callApi';
import { Playlist } from '../types';
import { actions } from '../store';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../constants';

const fetchPlaylists = async (): Promise<Playlist[]> => {
  const request = await callApi({
    url: ApiRoutes.Playlists
  });

  if (request.error) {
    throw new Error(request.error);
  }

  const playlists: Playlist[] = request;

  const favorisPlaylist = playlists.find(
    (p) => p.title === FAVORIS_PLAYLIST_TITLE
  );

  actions.receivePlaylists(playlists);

  if (favorisPlaylist) {
    actions.receiveFavorisPlaylist(favorisPlaylist);
  }

  return playlists;
};

export default fetchPlaylists;
