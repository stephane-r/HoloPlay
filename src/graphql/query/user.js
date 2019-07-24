import gql from 'graphql-tag';

const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      favorisIds
      favoris
      playlists(where: { deleted: false }) {
        id
        name
        sources
      }
    }
  }
`;

export default GET_USER;
