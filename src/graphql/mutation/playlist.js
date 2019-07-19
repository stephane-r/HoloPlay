import gql from 'graphql-tag';

export const CREATE_PLAYLIST = gql`
  mutation($name: String!, $users: [ID]) {
    createPlaylist(input: { data: { name: $name, users: $users } }) {
      playlist {
        name
      }
    }
  }
`;

export const UPDATE_PLAYLIST = gql`
  mutation($id: ID!, $name: String!, $users: [ID]) {
    updatePlaylist(
      input: { where: { id: $id }, data: { name: $name, users: $users } }
    ) {
      playlist {
        name
      }
    }
  }
`;

export const REMOVE_PLAYLIST = gql`
  mutation($id: ID!) {
    deletePlaylist(input: { where: { id: $id } }) {
      playlist {
        name
      }
    }
  }
`;
