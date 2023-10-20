import * as actionTypes from "../actionTypes/actionTypes";

export const createSlide = (slide: slide) => ({
	type: actionTypes.CREATE_SLIDE,
	payload: slide,
});
export const selectSlide = (slideID: string) => ({
	type: actionTypes.SELECT_SLIDE,
	payload: slideID,
});
export const updateSlide = (slide: slide) => ({
	type: actionTypes.UPDATE_SLIDE,
	payload: slide,
});
export const copyElement = (copiedElement: slide | slideElement) => ({
	type: actionTypes.COPY_ELEMENT,
	payload: copiedElement,
});
export const pasteSlide = () => ({
	type: actionTypes.PASTE_SLIDE,
});
export const deleteSlide = (slideID: string, slideIndex: number) => ({
	type: actionTypes.DELETE_SLIDE,
	payload: { slideID: slideID, slideIndex: slideIndex },
});
