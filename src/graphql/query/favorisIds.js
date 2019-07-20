import gql from 'graphql-tag';

const GET_FAVORIS_IDS = gql`
  {
    user {
      favorisIds
      favoris
    }
  }
`;

export default GET_FAVORIS_IDS;
