import { cloneDeep } from "lodash";
import Powerpoint from "../../logic/Powerpoint";
import * as actionTypes from "../actionTypes/actionTypes";
interface storeAction {
	type:
		| typeof actionTypes.CREATE_SLIDE
		| typeof actionTypes.PASTE_ELEMENT
		| typeof actionTypes.DELETE_SLIDE
		| typeof actionTypes.CREATE_SLIDE_ELEMENT;
}
interface selectAction {
	type:
		| typeof actionTypes.SELECT_SLIDE
		| typeof actionTypes.SELECT_SLIDE_ELEMENT;
	payload: number;
}

interface copyAction {
	type: typeof actionTypes.COPY_ELEMENT;
	payload: ISlide | ISlideElement;
}
interface updateSlideElementAction {
	type: typeof actionTypes.UPDATE_SLIDE_ELEMENT;
	payload: ISlideElement;
}

export const rootReducer = (
	state = Powerpoint.getInstance(),
	action: storeAction | selectAction | copyAction | updateSlideElementAction
) => {
	switch (action.type) {
		case actionTypes.CREATE_SLIDE: {
			let updatedState = cloneDeep(state);
			updatedState.addNewSlide();
			return updatedState;
		}
		case actionTypes.SELECT_SLIDE: {
			let updatedState = cloneDeep(state);
			updatedState.activeSlide = updatedState.slides[action.payload];
			return updatedState;
		}
		case actionTypes.DELETE_SLIDE: {
			let updatedState = cloneDeep(state);
			updatedState.deleteSlide();
			return updatedState;
		}
		case actionTypes.COPY_ELEMENT: {
			let updatedState = cloneDeep(state);
			updatedState.copyElement(action.payload);
			return updatedState;
		}
		case actionTypes.PASTE_ELEMENT: {
			let updatedState = cloneDeep(state);
			updatedState.pasteElement();
			return updatedState;
		}
		case actionTypes.CREATE_SLIDE_ELEMENT: {
			let updatedState = cloneDeep(state);
			updatedState.activeSlide?.addElement();
			return updatedState;
		}
		case actionTypes.SELECT_SLIDE_ELEMENT: {
			let updatedState = cloneDeep(state);
			if (updatedState.activeSlide) {
				updatedState.activeSlide.selectedElement =
					action.payload !== -1
						? updatedState.activeSlide?.elements[action.payload]
						: null;
			}
			return updatedState;
		}
		case actionTypes.UPDATE_SLIDE_ELEMENT: {
			let updatedState = cloneDeep(state);
			updatedState.activeSlide?.updateElement(action.payload);
			return updatedState;
		}
		default: {
			return state;
		}
	}
};
