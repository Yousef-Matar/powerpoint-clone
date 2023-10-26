import * as actionTypes from "../actionTypes/actionTypes";
import * as actionInterfaces from "../interfaces/interfaces";

export const createSlide = (): actionInterfaces.storeAction => ({
	type: actionTypes.CREATE_SLIDE,
});
export const selectSlide = (
	slideIndex: number
): actionInterfaces.selectAction => ({
	type: actionTypes.SELECT_SLIDE,
	payload: slideIndex,
});
export const deleteSlide = (): actionInterfaces.storeAction => ({
	type: actionTypes.DELETE_SLIDE,
});
export const copyElement = (
	copiedElementType: string
): actionInterfaces.copyAction => ({
	type: actionTypes.COPY_ELEMENT,
	payload: copiedElementType,
});
export const pasteElement = (): actionInterfaces.storeAction => ({
	type: actionTypes.PASTE_ELEMENT,
});
export const createSlideElement = (): actionInterfaces.storeAction => ({
	type: actionTypes.CREATE_SLIDE_ELEMENT,
});
export const selectSlideElement = (
	slideElementIndex: number | undefined
): actionInterfaces.selectAction => ({
	type: actionTypes.SELECT_SLIDE_ELEMENT,
	payload: slideElementIndex ? slideElementIndex : 0,
});
export const deleteSlideElement = (): actionInterfaces.storeAction => ({
	type: actionTypes.DELETE_SLIDE_ELEMENT,
});
export const updateSlideElement = (
	slideElement: ISlideElement | IElementPosition
): actionInterfaces.updateSlideElementAction => ({
	type: actionTypes.UPDATE_SLIDE_ELEMENT,
	payload: slideElement,
});
