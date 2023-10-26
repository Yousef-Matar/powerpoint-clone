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
export const copyElement = (copiedElementType: string) => ({
	type: actionTypes.COPY_ELEMENT,
	payload: copiedElementType,
});
export const pasteElement = () => ({
	type: actionTypes.PASTE_ELEMENT,
});
export const addSlideElement = () => ({
	type: actionTypes.CREATE_SLIDE_ELEMENT,
});
export const selectSlideElement = (slideElementIndex: number) => ({
	type: actionTypes.SELECT_SLIDE_ELEMENT,
	payload: slideElementIndex,
});
export const updateSlideElement = (slideElement: ISlideElement) => ({
	type: actionTypes.UPDATE_SLIDE_ELEMENT,
	payload: slideElement,
});
