
// product
export const setProduct = (product) => {
    return {
        type: "SET_PRODUCT",
        payload: product
    }
}

export const selectProduct = (product) => {
    return {
        type: "SELECT_PRODUCT",
        payload: product
    }
}

export const removeProduct = () => {
    return {
        type: "REMOVE_PRODUCT",
    }
}

export const filterProduct = (value) => {
    return {
        type: "FILTER_PRODUCT",
        text: value
    }
}

// cart
export const addToCart = (product) => {
    return {
        type: "ADD_PRODUCT_TOCART",
        payload: product
    }
}

export const increaseItem = (product) => {
    return {
        type: "INCREASE_ITEM",
        payload: product
    }
}

export const decreaseItem = (product) => {
    return {
        type: "DECREASE_ITEM",
        payload: product
    }
}

export const removeCartItem = (product) => {
    return {
        type: "REMOVE_TOCART",
        payload: product
    }
}

export const authChecking = (flag) => {
    console.log(flag)
    return {
        type: "LOGGED_IN",
        payload: flag
    }
}

