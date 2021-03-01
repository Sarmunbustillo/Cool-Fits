import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mangodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 36, // how long should thy stay signd in?
  secret: process.env.COOKIE_SECRET,
};
export default config({
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
  }),

  ui: {
    // todo change this fo roles
    isAccessAllowed: () => true,
  },

  // todo add session values here
});
