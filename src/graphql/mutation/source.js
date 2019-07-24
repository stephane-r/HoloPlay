import gql from 'graphql-tag';

export const REMOVE_PLAYLIST = gql`
  mutation($id: ID!, $deleted: Boolean) {
    updatePlaylist(input: { where: { id: $id }, data: { deleted: $deleted } }) {
      playlist {
        name
      }
    }
  }
`;
