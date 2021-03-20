import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must request a pasword reset first</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
