export const addDecimal = num = () => {
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart = state => {
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc,item)  => acc + item.price * item.price * item.qty , 0 ));

    state.shippingPrice = addDecimal(state.itemsPrice > 500 ? 0 : 50 )

    state.taxPrice = addDecimal(Number((0.12 * state.itemsPrice).toFixed(2)));

    state.totalPrice = (
        Number(state.itemsPrice)+Number(state.taxPrice)+Number(state.shippingPrice)
    ).toFixed(2);

    localStorage.setItem('cart',JSON.stringify(state));
    return state;
}

