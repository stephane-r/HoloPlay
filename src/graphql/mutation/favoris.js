import gql from 'graphql-tag';

export const ADD_TO_FAVORIS = gql`
  mutation($userId: ID!, $favorisIds: JSON, $favoris: JSON) {
    updateUser(
      input: {
        where: { id: $userId }
        data: { favorisIds: $favorisIds, favoris: $favoris }
      }
    ) {
      user {
        username
        favorisIds
      }
    }
  }
`;

export const test = '';
