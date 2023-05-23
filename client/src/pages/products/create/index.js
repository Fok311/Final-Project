import { useState } from 'react'
import { Input, Button, FileInput } from 'react-daisyui'
import { useMutation } from 'react-query'
import { addProduct } from '../../api/product'
import Swal from 'sweetalert2'

export default function AddProductForm () {
  const [product, setProduct] = useState({})
  const [image, setImage] = useState()
  const onChangeHandler = e =>
    setProduct({ ...product, [e.target.name]: e.target.value })

  const imageHandler = e => setImage(e.target.files[0])

  const { mutate } = useMutation(
    ({ product, image }) => addProduct(product, image),
    {
      onSuccess: data => {
        Swal.fire('Success', data.msg, 'success')
      },
      onError: error => {
        Swal.fire('Oops...', error.response.data.msg, 'error')
      }
    }
  )

  const onSubmitHandler = e => {
    e.preventDefault()
    mutate({ product, image })
  }
  return (
    <div className='grid grid-cols-12'>
      <div className='sm:col-start-5 sm:col-span-4 col-span-10 col-start-2'>
        <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
          <div className='mb-4'>
            <Input
              className='w-full'
              placeholder='Product Name'
              name='name'
              onChange={onChangeHandler}
            />
          </div>
          <div className='mb-4'>
            <Input
              className='w-full'
              type='number'
              placeholder='Price'
              name='price'
              onChange={onChangeHandler}
            />
          </div>
          <div className='mb-4'>
            <Input
              className='w-full'
              placeholder='Description'
              name='description'
              onChange={onChangeHandler}
            />
          </div>
          <div className='mb-4'>
            <Input
              className='w-full'
              type='number'
              placeholder='Quantity'
              name='quantity'
              onChange={onChangeHandler}
            />
          </div>
          <div className='mb-4'>
            <FileInput
              className='w-full'
              name='image'
              bordered
              onChange={imageHandler}
            />
          </div>
          <Button className='block w-full'>Add Product</Button>
        </form>
      </div>
    </div>
  )
}
