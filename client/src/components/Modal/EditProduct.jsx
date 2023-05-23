import { Modal, Button, Input, FileInput } from "react-daisyui";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateProduct } from "@/pages/api/product";

export default function EditProduct({ visible, setVisible, product }) {
  const [updatedProduct, setUpdatedProduct] = useState({            
    id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    quantity: product.quantity,
  });
  const [image, setImage] = useState();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateProduct, {
    onSuccess: (data) => {
      alert("product updated successfully");
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      alert(error.response.data.msg);
    },
  });

  const onChangeHandler = (e) =>
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });

  const imageHandler = (e) => setImage(e.target.files[0]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ updatedProduct, image });
  };
  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Modal.Header className="font-bold">Edit Product</Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Product Name"
                name="name"
                onChange={onChangeHandler}
                value={updatedProduct.name}
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                className="w-full"
                placeholder="Price"
                name="price"
                onChange={onChangeHandler}
                value={updatedProduct.price}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Description"
                name="description"
                onChange={onChangeHandler}
                value={updatedProduct.description}
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                className="w-full"
                placeholder="Quantity"
                name="quantity"
                onChange={onChangeHandler}
                value={updatedProduct.quantity}
              />
            </div>
            <div>
              <FileInput
                className="w-full"
                name="image"
                bordered
                onChange={imageHandler}
              />
            </div>
            <Button
              type="button"
              color="error"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button color="success">Confirm</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
