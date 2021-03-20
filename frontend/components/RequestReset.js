import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e?.preventDefault(); // stop the form from submiting
    // send email and password to the graphqlAPI
    const res = await signup().catch(console.error(error));
    console.log('request reset user --', { data, loading, error });
    resetForm();
  }

  // data?.sendUserPasswordResetLink === null means success
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check Your Email for a Link</p>
        )}

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

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
