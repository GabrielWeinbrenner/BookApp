import { createStore, combineReducers } from "redux";

import booksReducer from "./src/reducers/booksReducer";

const rootReducer = combineReducers({
	books: booksReducer,
});

const configureStore = () => {
	return createStore(rootReducer);
};

export default configureStore;
