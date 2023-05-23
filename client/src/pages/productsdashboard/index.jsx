import { getProducts } from "../api/product"
import { useQuery } from "react-query"
import { Table, Checkbox } from "react-daisyui";
import Products from "./Product";

//fetch all data
//then map the product component
export default function dashboard(props) {
    const { data } = useQuery("products", getProducts, {
        refetchOnMount: false,
        revalidateOnMount: true,
      });
    return (
        <div className='overflow-x-auto'>
            <Table className="rounded-box mx-auto">
                <Table.Head>
                <Checkbox />
                <span>Product</span>
                <span>Description</span>
                <span>Price</span>
                <span>Quantity</span>
                <span></span>   
                <span></span>
                <span></span>
                </Table.Head>
    
            <Table.Body>
              {data &&
                data.map((product) => (
                    <Products key={product._id} product={product}  />
                ))}
            </Table.Body>
    
            <Table.Footer>
              <span>&nbsp;</span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>   
              <span></span>
              <span></span>
              <span>&nbsp;</span>

            </Table.Footer>
          </Table>
        </div>
      )
}

export async function getServerSideProps() {
    const data = await getProducts();
    return {
      props: { data },
    };
  }
  