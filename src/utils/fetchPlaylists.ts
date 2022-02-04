import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from "../constants";
import { Playlist } from "../types";
import callApi from "./callApi";

const fetchPlaylists = async (): Promise<Playlist[]> => {
  const playlists: Playlist[] = await callApi({
    url: ApiRoutes.Playlists,
  });

  if (playlists.error) {
    throw new Error(playlists.error);
  }

  const favorisPlaylist = playlists.find(
    (p) => p.title === FAVORIS_PLAYLIST_TITLE
  );

  // actions.receivePlaylists(playlists);

  if (favorisPlaylist) {
    // actions.receiveFavorisPlaylist(favorisPlaylist);
  }

  return playlists;
};

export default fetchPlaylists;
