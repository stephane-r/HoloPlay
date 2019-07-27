// @flow
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { withApollo } from 'react-apollo';
import Spacer from '../../components/Spacer';
import { CREATE_USER } from '../../graphql/mutation/register';

type RegisterFormProps = {
  client?: Object,
  navigation: Object
};

const fieldIsEmpty = value => value === null || value === '';

const RegisterForm = ({ client, navigation }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const register = async () => {
    if (
      fieldIsEmpty(username) ||
      fieldIsEmpty(email) ||
      fieldIsEmpty(password)
    ) {
      return alert('Form is not valid');
    }

    await client.mutate({
      mutation: CREATE_USER,
      variables: { username, email, password }
    });
    return navigation.navigate('Login');
  };

  return (
    <>
      <TextInput
        mode="outlined"
        onChangeText={setUsername}
        label="username"
        value={username}
      />
      <Spacer height={15} />
      <TextInput
        mode="outlined"
        onChangeText={setEmail}
        label="email"
        value={email}
      />
      <Spacer height={15} />
      <TextInput
        mode="outlined"
        onChangeText={setPassword}
        label="Password"
        value={password}
      />
      <Spacer height={20} />
      <Button
        mode="contained"
        onPress={register}>
        Register
      </Button>
    </>
  );
};

export default withApollo<RegisterFormProps>(RegisterForm);
