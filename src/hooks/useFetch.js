import { useReducer, useEffect } from 'react';
import axios from 'axios';

const types = {
  FETCH_SUCCESS: 'FETCH_SUCCES',
  FETCH_ERROR: 'FETCH_ERROR'
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload
      };
    case types.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const useFetch = url => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: null,
    list: []
  });

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await axios.get(url);
        dispatch({
          type: types.FETCH_SUCCESS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: types.FETCH_ERROR,
          payload: err
        });
      }
    }
    if (url) {
      fetchList();
    }
  }, [url]);

  return state;
};

export default useFetch;
