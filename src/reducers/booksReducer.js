import { UPLOAD_BOOKS } from "../constants";

const initialState = {
	books: [],
};

const booksReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_BOOKS:
			return {
				...state,
				books: state.books.concat(action.payload),
			};
		default:
			return state;
	}
};

export default booksReducer;
