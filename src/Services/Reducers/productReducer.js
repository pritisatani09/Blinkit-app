const initalState = {
    products:  [],
    product: null,
    isLoading: false,
    isError: "",
    isCreated: false,
    isUpdated: false
}


export const productReducer = (state = initalState, action) => {
    switch(action.type){
        case "LOADING": 
        return {
            ...state,
            isLoading: true
        }
        case "ADD_PRODUCT_SUC":
            return {
                ...state,
                isCreated: true
            };
        case "ADD_PRODUCT_REJ":
            return {
                ...state,
                isError: action.payload
            };
        
        case "GET_ALL_PRODUCTS_SUC": 
            return {
                ...state,
                products: action.payload,
                isLoading: false,
                isCreated: false,
                isUpdated: false,
                isError: ""
            }
        
        case "GET_ALL_PRODUCTS_REJ": 
            return {
                ...state,
                isLoading: false,
                isCreated: false,
                isUpdated: false,
                isError: action.payload
            }

        case "GET_PRODUCT":
            return {
                ...state,
                product: action.payload
            }
        
        case "UPDATE_PRODUCT":
            return {
                ...state,
                product: null,
                isUpdated: true,
            }
        default:
            return state;
    }
}