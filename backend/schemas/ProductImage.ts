/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import 'dotenv/config';
import { isSignedIn, permissions } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'coolFits',
};

export const ProductImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageProducts,
    delete: permissions.canManageProducts,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({
      ref: 'Product.photo',
    }),
  },

  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});
