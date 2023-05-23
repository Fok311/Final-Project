import { useQuery } from 'react-query'
import { Table } from 'react-daisyui'
import { getCart } from '../api/carts'
import CartItem from '@/components/CartItem'
import axios from 'axios'
import localforage from 'localforage'
export default function Cart () {
  const { data, isLoading } = useQuery('cart', getCart, {
    refetchOnMount: false
  })

  if (isLoading) return <h2>Loading...</h2>

  const checkoutHandler = async e => {
    e.preventDefault()
    const res = await axios.post('http://localhost:3500/orders', data, {
      headers: { 'x-auth-token': await localforage.getItem('token') }
    })
    if (res.status === 200) window.location.href = res.data
  }

  return (
    <div className='overflow-x-auto'>
      <Table className='mx-auto'>
        <Table.Head>
          <span>Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </Table.Head>
        <Table.Body>
          {/*
            ? - optional chaining if the data is null or undefined don't throw an error
          */}
          {data &&
            data?.items?.map(item => <CartItem key={item._id} item={item} />)}
        </Table.Body>
        <Table.Footer>
          <span></span>
          <span></span>
          <span>
            <form onSubmit={checkoutHandler}>
              <button>Checkout</button>
            </form>
          </span>
          <span>Total: {data.total}</span>
        </Table.Footer>
      </Table>
    </div>
  )
}
