import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything

    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;

      // read the number of items on the age from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // first thing it does it asks the read for those items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if
      // -- there are items
      // -- AND there aren't enough items to satisfy how many we requested
      // -- AND we are on the last page
      // THEN JUST SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any items we must go to the network and fetch them
        return false;
      }

      // if there are items just return them and do not go to the network
      if (items.length) {
        console.log(
          `there are ${items.length} in the cache! gonna send them to apollo`
        );
        return items;
      }

      return false; // fallback to network
      // we can d either do one of two things:
      // first thing we can do is return the items because they are already in the cache
      // the other thing we can do is to return false from here, (network request)
    },

    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the apollo cient comes back from the network with our products
      console.log(`merging items from the network${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      //
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // finally we return the merged from the cache
      return merged;
    },
  };
}
