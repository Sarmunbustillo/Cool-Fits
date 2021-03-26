import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { extendGraphqlSchema } from './mutations/index';
import { CartItem } from './schemas/CartItem';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { insertSeedData } from './seed-data';
import { sendPassWordResetEmail } from './lib/mail';

const databaseURL =
  process.env.DATABASE_URL || 'mangodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 36, // how long should thy stay signd in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // todo add in initial roles
  },
  passwordResetLink: {
    async sendToken(args) {
      // send  email

      await sendPassWordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },

    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('connected to the db');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
      // todo: add data seeding here
    },

    lists: createSchema({
      // schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
    }),
    extendGraphqlSchema,
    ui: {
      // show the ui only for the people who pass this test
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session?.data;
      },
    },

    // todo add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // Graphql query
      User: 'id name email',
    }),
  })
);
