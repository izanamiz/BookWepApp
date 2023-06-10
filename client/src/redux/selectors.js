export const currentUser = (state) => state.auth.login.currentUser;

export const bookListSelector = (state) => state.books.bookList;

export const genreListSelector = (state) => state.genres.genreList;

export const reviewListSelector = (state) => state.reviews.reviewList;

export const cartListSelector = (state) => state.cart.cartList;

export const orderListSelector = (state) => state.order.orderList;

export const orderDetailListSelector = (state) => state.orderDetail.orderDetailList;
