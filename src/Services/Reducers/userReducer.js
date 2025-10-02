const intialState = {
    user:  JSON.parse(sessionStorage.getItem("user")) || null,
    isCreated: false,
    error: "",
    isLoading: false
};


export const userReducer = (state = intialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true,
                isCreated: false
            }
        case "ERROR": 
            return {
                ...state,
                error: action.payload,
                isCreated: false
            }
        case "REGISTER": 
        return {
            ...state,
            error: "",
            isLoading: false,
            isCreated: true
        }
        
        case "LOGIN_SUC": 
        sessionStorage.setItem("user", JSON.stringify(action.payload));
        return {
            ...state,
            error: "",
            isLoading: false,
            isCreated: false,
            user: action.payload
        }
        
        case "LOGOUT_SUC": 
        sessionStorage.removeItem("user");
        return {
            ...state,
            error: "",
            isLoading: false,
            isCreated: false,
            user: null
        }
    
        default:
            return state;
    }
}