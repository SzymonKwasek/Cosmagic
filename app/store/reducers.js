const initialState = {
    user: {}
  }
  
  const reducer = (state=initialState, action) => {
    switch(action.type)
    {
      case 'SET_USER':
      return { user: action.user }
    }
    return state
  }

  export default reducer