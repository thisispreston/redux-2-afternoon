import axios from 'axios'

// let REQUEST_USER_DATA =

let requestUserData = () => {
  let data = axios.get('/auth/user-data').then(res => res.data)
  return {
    type: REQUEST_USER_DATA,
    payload: data,
  }
}

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
}

function reducer (state = initialState, action) {
  return state
}

export default reducer