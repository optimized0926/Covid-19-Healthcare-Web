//
// Initial state
const initialState = {
  auth: {},
  status: {},
  daily: null,
  loading: false,
  errorMessage: '',
};

//
// Reducer
//
const authReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SIGN_IN_SUCCESS':
      return {...state, 
        auth: action.payload,        
        errorMessage: '',
      };
    case 'SIGN_IN_ERROR':
      return {...state,
        errorMessage: action.error
      }
    case 'SET_DAILY':
      return {...state,
        daily: action.payload
      };
    case 'SET_LOADING':
      return {...state,
        loading: action.payload
      };
    case 'UPDATE_SUCCESS':
      return {...state, status: action.status};
    default:
      return state;
  }
};
export default authReducer;
