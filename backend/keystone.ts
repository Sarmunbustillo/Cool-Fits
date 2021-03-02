import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';

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
      // todo: add data seeding here
    },

    lists: createSchema({
      // schema items go in here
      User,
    }),

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
