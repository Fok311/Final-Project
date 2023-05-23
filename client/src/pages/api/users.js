import axios from 'axios'
import localforage from 'localforage'

export const register = async userData => {
  const res = await axios.post('http://localhost:3500/users/register', userData)
  return res.data
}

export const login = async userData => {
  const res = await axios.post('http://localhost:3500/users/login', userData)
  if (res.data) {
    await localforage.setItem('token', res.data)
  }
  return res.data
}

export const logout = async () => {
  localStorage.removeItem('token')
  return { message: 'Logout successful' }
}

export const getUser = async () => {
  const token = await localforage.getItem('token')
  const res = await axios.get('http://localhost:3500/users', {
    headers: {
      'x-auth-token': token
    }
  })
  return res.data
}
