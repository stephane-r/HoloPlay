import gql from 'graphql-tag';

const GET_USER = gql`
  {
    me {
      username
    }
  }
`;

export default GET_USER;
