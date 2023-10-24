import Powerpoint from "../../logic/Powerpoint";
import * as actionTypes from "../actionTypes/actionTypes";

interface slideActions {
	type: typeof actionTypes.CREATE_SLIDE;
}

export const powerpointReducer = (
	state = Powerpoint.getInstance(),
	action: slideActions
) => {
	switch (action.type) {
		case actionTypes.CREATE_SLIDE: {
			state.addNewSlide();
			return state;
		}
		default: {
			return state;
		}
	}
};
