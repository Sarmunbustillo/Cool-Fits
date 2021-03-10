/* eslint-disable no-restricted-globals */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;
// we delete the item from the data base but it is still cached in the frontend
// so the user needs to reload for it to disspear. The fucntion updates the fontend
function update(cache, payload) {
  console.log(payload);
  console.log('running the update func after ');
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      update,
    }
  );
  return (
    <button
      disabled={loading}
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
