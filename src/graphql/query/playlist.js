import gql from 'graphql-tag';

const GET_USER_PLAYIST = gql`
  {
    playlists(where: { users: { id: 1 } }) {
      name
      id
    }
  }
`;

export default GET_USER_PLAYIST;
