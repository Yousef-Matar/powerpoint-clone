import * as actionTypes from "../actionTypes/actionTypes";

export const createSlide = () => ({
	type: actionTypes.CREATE_SLIDE,
});
export const selectSlide = (slideIndex: number) => ({
	type: actionTypes.SELECT_SLIDE,
	payload: slideIndex,
});
export const deleteSlide = () => ({
	type: actionTypes.DELETE_SLIDE,
});
export const copyElement = (copiedElement: ISlide | ISlideElement) => ({
	type: actionTypes.COPY_ELEMENT,
	payload: copiedElement,
});
export const pasteElement = () => ({
	type: actionTypes.PASTE_ELEMENT,
});
export const addSlideElement = () => ({
	type: actionTypes.CREATE_SLIDE_ELEMENT,
});
