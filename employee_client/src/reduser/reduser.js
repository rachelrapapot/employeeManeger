

const initialState = {

    user: JSON.parse(localStorage.getItem('user')),
    employeeList: []
 
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_OUT':
            {
                return {
                    ...state,
                    user: null

                }
                 break;
            }
            case 'LOGIN':
                {
                    return {
                        ...state,
                        user: action.payload
    
                    }
                     break;
                }
           
        case 'SET_WORKERS':
            {
                return {
                    ...state, employeeList: action.payload
                }
            }
            break;
        case 'ADD_WORKER':
            {
            return {
                ...state, employeeList: [...state.worker, action.payload]

            }
        }

    default:
        return state; 
    }

}
export default reducer;