import gql from 'graphql-tag';

const GET_USER = gql`
  {
    userMe {
      id
      username
    }
  }
`;

export default GET_USER;
