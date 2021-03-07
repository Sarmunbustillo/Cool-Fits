import SingleProduct from '../../components/SingleProduct';


// the query comes from the dynamic [id] feature fom next
export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
