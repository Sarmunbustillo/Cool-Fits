/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const DeleteCartItemButton = styled.button`
  all: initial;
  margin-right: 0.5em;
  font-size: 3rem;
  font-weight: bold;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const DELETE_FROM_CART_MUTATION = gql`
  mutation DELETE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function DeleteCartItem({ id }) {
  const [removeFromCart, { loading }] = useMutation(DELETE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typenam: 'CartItem',
    //     id,
    //   },
    // },
  });

  return (
    <DeleteCartItemButton
      disabled={loading}
      onClick={removeFromCart}
      type="button"
      title="Remove this item from cart"
    >
      &times;
    </DeleteCartItemButton>
  );
}
