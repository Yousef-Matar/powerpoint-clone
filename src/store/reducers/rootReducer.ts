import Powerpoint from "../../logic/Powerpoint";
import * as actionTypes from "../actionTypes/actionTypes";

interface storeAction {
	type:
		| typeof actionTypes.CREATE_SLIDE
		| typeof actionTypes.PASTE_ELEMENT
		| typeof actionTypes.DELETE_SLIDE;
}
interface selectAction {
	type: typeof actionTypes.SELECT_SLIDE;
	payload: ISlide;
}

interface copyAction {
	type: typeof actionTypes.COPY_ELEMENT;
	payload: ISlide | ISlideElement;
}

export const rootReducer = (
	state = Powerpoint.getInstance(),
	action: storeAction | selectAction | copyAction
) => {
	switch (action.type) {
		case actionTypes.CREATE_SLIDE: {
			state.addNewSlide();
			return state;
		}
		case actionTypes.SELECT_SLIDE: {
			state.activeSlide = action.payload;
			return state;
		}
		case actionTypes.DELETE_SLIDE: {
			state.deleteSlide();
			return state;
		}
		case actionTypes.COPY_ELEMENT: {
			state.copiedElement = action.payload;
			return state;
		}
		case actionTypes.PASTE_ELEMENT: {
			state.pasteElement();
			return state;
		}
		default: {
			return state;
		}
	}
};
