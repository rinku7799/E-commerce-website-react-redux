// import { filterProduct } from "./action";

const initialData = {
    appliedFilters: [],
    products: [],
};

const productListReducer = (state = initialData, action) => {
    switch (action.type) {
        case "SET_PRODUCT":
            return { ...state, products: [...action.payload] };
        case "FILTER_PRODUCT":
            let newState = Object.assign({}, state);
            let value = action.text;

            let filteredValues = state.products.filter((product) => {
                return product.category.startsWith(value);
            });

            let appliedFilters = state.appliedFilters;
            if (value) {
                let index = appliedFilters.indexOf("FILTER_PRODUCT");
                if (index === -1) appliedFilters.push("FILTER_PRODUCT");
                newState.filteredProducts = filteredValues;
            } else {
                let index = appliedFilters.indexOf("FILTER_PRODUCT");
                appliedFilters.splice(index, 1);
                if (appliedFilters.length === 0) {
                    newState.filteredProducts = newState.products;
                }
            }
            return newState;

        default:
            return { ...state };
    }
};

const selectedProductReducer = (state = {}, action) => {
    switch (action.type) {
        case "SELECT_PRODUCT":
            return { ...action.payload };
        default:
            return state;
    }
};

const findEmail = JSON.parse(
    sessionStorage.getItem(window.sessionStorage.key(0))
)?.email;

const arry = JSON.parse(localStorage.getItem(findEmail))?.cart || [];

const addToCartReducer = (state = arry, action) => {
    switch (action.type) {
        case "ADD_PRODUCT_TOCART":
            return [...action.payload];
        case "REMOVE_TOCART":
            return action.payload
        case "INCREASE_ITEM":
            return action.payload
        case "DECREASE_ITEM":
            return action.payload
        default:
            return state;
    }
};

const Authentication = (state = { email: "", islogin: false }, action) => {

    switch (action.type) {
        case "LOGGED_IN":
            const { email, flag } = action.payload;
            return { ...state, email: action.payload.email, islogin: action.payload.flag };
        default:
            return state;
    }
};

const productreducer = { productListReducer, selectedProductReducer, addToCartReducer, Authentication }

export default productreducer;