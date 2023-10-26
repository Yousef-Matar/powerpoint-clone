import * as actionTypes from "../actionTypes/actionTypes";
export interface storeAction {
	type:
		| typeof actionTypes.CREATE_SLIDE
		| typeof actionTypes.PASTE_ELEMENT
		| typeof actionTypes.DELETE_SLIDE
		| typeof actionTypes.CREATE_SLIDE_ELEMENT;
}
export interface selectAction {
	type:
		| typeof actionTypes.SELECT_SLIDE
		| typeof actionTypes.SELECT_SLIDE_ELEMENT;
	payload: number;
}

export interface copyAction {
	type: typeof actionTypes.COPY_ELEMENT;
	payload: string;
}
export interface updateSlideElementAction {
	type: typeof actionTypes.UPDATE_SLIDE_ELEMENT;
	payload: ISlideElement | IElementPosition;
}
