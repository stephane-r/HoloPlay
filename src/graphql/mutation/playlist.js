import gql from 'graphql-tag';

export const CREATE_PLAYLIST = gql`
  mutation($name: String!, $users: [ID], $deleted: Boolean) {
    createPlaylist(
      input: { data: { name: $name, users: $users, deleted: $deleted } }
    ) {
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
  mutation($id: ID!, $deleted: Boolean) {
    updatePlaylist(input: { where: { id: $id }, data: { deleted: $deleted } }) {
      playlist {
        name
      }
    }
  }
`;

export const ADD_SOURCE_TO_PLAYLIST = gql`
  mutation($id: ID!, $sources: JSON) {
    updatePlaylist(input: { where: { id: $id }, data: { sources: $sources } }) {
      playlist {
        name
      }
    }
  }
`;
