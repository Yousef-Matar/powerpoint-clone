import { cloneDeep } from "lodash";
import Powerpoint from "../../logic/Powerpoint";
import * as actionTypes from "../actionTypes/actionTypes";
import * as actionInterfaces from "../interfaces/interfaces";

export const rootReducer = (
	state = Powerpoint.getInstance(),
	action:
		| actionInterfaces.storeAction
		| actionInterfaces.selectAction
		| actionInterfaces.copyAction
		| actionInterfaces.updateSlideElementAction
		| actionInterfaces.createSlideElementAction
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
			updatedState.activeSlide?.addElement(action.payload);
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
		case actionTypes.DELETE_SLIDE_ELEMENT: {
			let updatedState = cloneDeep(state);
			updatedState.activeSlide?.removeElement();
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
