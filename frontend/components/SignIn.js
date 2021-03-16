import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e?.preventDefault(); // stop the form from submiting
    // send email and password to the graphqlAPI
    const res = await signin();

    resetForm();
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  const success =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordSuccess'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <>
      {!success && (
        <Form method="POST" onSubmit={handleSubmit}>
          <h2>Sign Into Your Account</h2>
          <DisplayError error={error} />
          <fieldset>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Password
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="Password"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Sign in!</button>
          </fieldset>
        </Form>
      )}

      {success && <h2>You are logged in</h2>}
    </>
  );
}
