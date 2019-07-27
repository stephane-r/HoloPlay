import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation($username: String!, $email: String!, $password: String) {
    createUser(
      input: {
        data: { username: $username, email: $email, password: $password }
      }
    ) {
      user {
        username
      }
    }
  }
`;

export const test = '';
