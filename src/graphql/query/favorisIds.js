import gql from 'graphql-tag';

const GET_FAVORIS_IDS = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      favorisIds
      favoris
    }
  }
`;

export default GET_FAVORIS_IDS;
