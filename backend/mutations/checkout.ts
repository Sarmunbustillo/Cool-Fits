import { KeystoneContext } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { products } from '../seed-data/data';
import {
  CartItemUpdateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */

const graphql = String.raw;
interface Arguments {
  token: string;
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. MAke sure they are signed in

  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry ! you must be signed in to create an order');
  }
  // 1.5. Query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
        id
        name
        email
        cart {
            id
            quantity
            product {
                name
                price
                description
                id
                photo {
                    id
                    image {
                        id
                        publicUrlTransformed

                    }
                }
            }
        }
    `,
  });
  console.dir(user, { depth: null });

  // 2. Calcuate the total price
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(function (
    tally: number,
    cartItem: CartItemUpdateInput
  ) {
    return tally + cartItem.quantity + cartItem.product.price;
  },
  0);
  console.log(amount);
  // 3.create the charge with stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'NOK',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  console.log(charge);
  // 4. convert the cartItem to orderItem
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });

  // 5. create the rder and return it

  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  // 6. clean up any old cart items
  const CartItemIds = user.cart.map((cartItem) => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: CartItemIds,
  });

  return order;
}

export default checkout;
