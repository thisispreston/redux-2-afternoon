import axios from 'axios'

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false,
}
let REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
let ADD_PURCHASE = 'ADD_PURCHASE'
let REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const requestBudgetData = () => {
  let data = axios
    .get('/api/budget-data')
    .then(res => res.data)
    .catch(err => err.message)

  return {
    type: REQUEST_BUDGET_DATA,
    payload: data,
  }
}

export const addPurchase = (price, description, category) => {
  let data = axios
    .post('/api/budget-data/purchase', { description, price, category })
    .then(res => res.data)
    .catch(err => err.message)
  
  return {
    type: ADD_PURCHASE,
    payload: data,
  }
}

export const removePurchase = (id) => {
  let data = axios
    .delete(`/api/budget-data/purchase/${id}`)
    .then(res => res.data)
    .catch(err => err.message)

  return {
    type: REMOVE_PURCHASE,
    payload: data,
  }
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_BUDGET_DATA + '_PENDING':
      return {...state, loading: true}
    case REQUEST_BUDGET_DATA + '_FULFILLED':
      return { ...state, ...action.payload, loading: false }
    case REQUEST_BUDGET_DATA + '_REJECTED':
      return {...state, errorMessage: action.payload}

    case ADD_PURCHASE + '_PENDING':
      return {...state, loading: true}
    case ADD_PURCHASE + '_FULFILLED':
      return { ...state, purchases: action.payload, loading: false }
    case ADD_PURCHASE + '_REJECTED':
      return {...state, errorMessage: action.payload}
    
    case REMOVE_PURCHASE + '_PENDING':
      return {...state, loading: true}
    case REMOVE_PURCHASE + '_FULFILLED':
      return { ...state, purchases: action.payload, loading: false }
    case REMOVE_PURCHASE + '_REJECTED':
      return {...state, errorMessage: action.payload}    
    
    default:
      return state
  }
}

export default reducer

