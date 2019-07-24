import gql from 'graphql-tag';

const GET_ME = gql`
  {
    userMe {
      id
    }
  }
`;

export default GET_ME;
