import { UPLOAD_BOOKS } from "../constants";
export function uploadBooks(books) {
	return {
		type: UPLOAD_BOOKS,
		payload: books,
	};
}
