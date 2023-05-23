import Product from "./[id]";
import { getProducts } from "../api/product";
import { useQuery } from "react-query";

export default function ProductsList(props) {
  const { data } = useQuery("products", getProducts, {
    initialData: props.data,
    refetchOnMount: false,
  });
  return (
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-3 gap-4">
        {data.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

//this function getServerSideProps will not work if its not a page.
//getStaticProps and getServerSideProps
//both allows you to fetch data in your pages. getStaticProps is used to fetch data at build time while getServerSideProps fetch data at request time (data is fetch everytime a user requests the page.).
export async function getServerSideProps() {
  const data = await getProducts();
  return {
    props: { data },
  };
}
