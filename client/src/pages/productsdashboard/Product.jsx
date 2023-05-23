import { Table, Checkbox, Button, Mask } from "react-daisyui";
import { useMutation,useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { deleteProduct } from "@/pages/api/product";
import { useState } from "react";
import EditProduct from "@/components/Modal/EditProduct";


export default function Products({product}) {
    const [visible, setVisible] = useState(false)


    const queryClient = useQueryClient()
    const { mutate } = useMutation(
        deleteProduct,
        {
          onSuccess: data => {
            Swal.fire('Success', data.msg, 'success')
            queryClient.invalidateQueries("products")
          },
          onError: error => {
            Swal.fire('Oops...', error.response.data.msg, 'error')
          }
        }
      )
    
      const onDeleteHandler = (id) => {
        mutate(id) 
      }

    return (
                <Table.Row>
                <Checkbox />
                <div className="flex items-center space-x-3 truncate">
                  <Mask
                    variant="squircle"
                    src={`http://localhost:3500/${product.image.replace("public", "")}`} alt={product.name}
                    className="h-20 w-20"
                  />
                  <div>
                    <div className="font-bold">{product.name}</div>
                  </div>
                </div>
                <div>
                  {product.description}
                  <br />    
                </div>
                <div>{product.price}</div>
                <div>{product.quantity}</div>
                <Button color="primary" size="xs" onClick={() => setVisible(true)}>Edit</Button>
                <EditProduct visible={visible} setVisible={setVisible} product={product} />

                <Button color="error" size="xs" onClick={() => onDeleteHandler(product._id)}>
                  delete
                </Button>
              </Table.Row>
    
            
    )
}