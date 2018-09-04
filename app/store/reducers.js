const initialState = {
    user: {},
    clients: []
  }
  
  const reducer = (state=initialState, action) => {
    switch(action.type)
    {
      case 'SET_USER':
      return { user: action.user }
      case 'ADD_CLIENT':
      return { clients: [...action.clients, action.client ], user: state.user }
      case 'ADD_FIRST':
      return { clients: [action.client], user: state.user }
      case 'CLEAR_TABLE':
      return {clients: [], user: state.user} 
    }
    return state
  }

  export default reducer