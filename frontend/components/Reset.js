import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  async function handleSubmit(e) {
    e?.preventDefault(); // stop the form from submiting
    // send email and password to the graphqlAPI
    const res = await reset().catch(console.error);
    console.log('reset user --', res);
    resetForm();
  }

  // data?.redeemUserPasswordResetToken === null means success
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || successfulError} /> 
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && <p>Success!</p>}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="emailSignup"
            placeholder="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="passsword">
          Password
          <input
            type="password"
            name="password"
            id="passwordSignUp"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}
