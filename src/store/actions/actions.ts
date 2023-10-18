import { CREATE_SLIDE, SELECT_SLIDE } from "../actionTypes/actionTypes";

export const createSlide = (slide: slide) => ({
	type: CREATE_SLIDE,
	payload: slide,
});
export const selectSlide = (slideID: string) => ({
	type: SELECT_SLIDE,
	payload: slideID,
});
