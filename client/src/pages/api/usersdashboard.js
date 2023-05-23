import axios from 'axios'
import localforage from 'localforage'

//get all user
export const getAllUsers = async () => {
  const res = await axios.get('http://localhost:3500/dashboard', {
    headers: {
      'x-auth-token': await localforage.getItem('token')
    }
  })
  return res.data
}

//read a user by id
export const getUserById = async id => {
  const res = await axios.get(`http://localhost:3500/dashboard/${id}`, {
    headers: {
      'x-auth-token': await localforage.getItem('token')
    }
  })
  return res.data
}

//update a user by id
export const updateUserById = async (id, user) => {
  const res = await axios.put(`http://localhost:3500/dashboard/${id}`, user, {
    headers: {
      'x-auth-token': await localforage.getItem('token')
    }
  })
  return res.data
}

//delete a user by id
export const deleteUserById = async id => {
  const res = await axios.delete(`http://localhost:3500/dashboard/${id}`, {
    headers: {
      'x-auth-token': await localforage.getItem('token')
    }
  })
  return res.data
}
