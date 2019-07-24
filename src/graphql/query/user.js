import gql from 'graphql-tag';

const GET_USER_ME = gql`
  query User($userId: ID!) {
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

export default GET_USER_ME;
