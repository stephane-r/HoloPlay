import gql from 'graphql-tag';

const GET_USER_PLAYIST = gql`
query Playlist($userId: ID!) {
  user(id: $userId) {
    id
    username
    favorisIds
    favoris
    playlists {
      name
    }
  }
}
`;

export default GET_USER_PLAYIST;
