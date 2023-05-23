import { Card, Button, Input } from "react-daisyui"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { addToCart } from "../api/carts"
import localforage from "localforage";

export default function Product({ product }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const getToken = async () => {
          const token = await localforage.getItem("token");
          if (token) {
            setAuth(token);
          }
        };
        getToken();
      }, []);

    const [quantity, setQuantity] = useState(1)
    const onChangeHandler = (e) => {
        setQuantity(e.target.value)
    }

    const queryClient = useQueryClient();

    const {mutate} = useMutation(addToCart, {
        onSuccess: (data) => {
            alert(data.msg);
            queryClient.invalidateQueries('products'); // 更新产品列表查询
            queryClient.setQueryData(['product', product._id], (prevData) => {
              // 更新产品数量
              return { ...prevData, quantity: prevData.quantity - quantity };
            });
          },
        onError: (error) => {
            alert(error.response.data.msg)
        }
    })

    const onSubmitHandler = (e) => {
        let productId = product._id
        e.preventDefault();
        if(quantity < 1) alert("Minimum quantity should be atleast 1")
        if(quantity > product.quantity) 
            alert('Quantity should not exceed available quantity')
        mutate({ quantity, productId: product._id })
    }



    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <Card>
          <div className="relative">
            <Card.Image
              src={`http://localhost:3500/${product.image.replace("public", "")}`}
              alt={product.name}
              className="h-64 object-cover rounded-t-lg"
            />
          </div>
          <Card.Body>
            <Card.Title tag="h2" className="text-2xl font-bold text-white mb-2">
              {product.name}
            </Card.Title>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">Price:</span>
              <span className="font-semibold text-white">{product.price}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">Quantity:</span>
              <span className="font-semibold text-white">{product.quantity}</span>
            </div>
            <Card.Actions className="flex justify-between items-center">
              <form onSubmit={onSubmitHandler}>
              <div className="form-control">
                <div className="input-group">
                  <Input
                    type="number"
                    name="quantity"
                    onChange={onChangeHandler}
                    className="w-20"
                  />
                  <Button color="primary">Add to Cart</Button>
                </div>
              </div>
              </form>
            </Card.Actions>
          </Card.Body>
        </Card>
      </div>
    )
}