import Powerpoint from "../../logic/Powerpoint";
import * as actionTypes from "../actionTypes/actionTypes";

// storeInterface = {
// 	copiedElement: null,
// 	slides: [],
// };

interface slideActions {
	type: typeof actionTypes.CREATE_SLIDE;
}
// interface selectAction {
// 	type: typeof actionTypes.SELECT_SLIDE;
// 	payload: string;
// }
// interface updateAction {
// 	type: typeof actionTypes.UPDATE_SLIDE;
// 	payload: slide;
// }
// interface copyAction {
// 	type: typeof actionTypes.COPY_ELEMENT;
// 	payload: slide | slideElement;
// }
// interface pasteAction {
// 	type: typeof actionTypes.PASTE_SLIDE | typeof actionTypes.PASTE_ELEMENT;
// }
// interface deleteSlideAction {
// 	type: typeof actionTypes.DELETE_SLIDE;
// 	payload: {
// 		slideID: string;
// 		slideIndex: number;
// 	};
// }
export const powerpointReducer = (
	state = new Powerpoint(),
	action: slideActions
	// | selectAction
	// | updateAction
	// | copyAction
	// | pasteAction
	// | deleteSlideAction
) => {
	switch (action.type) {
		case actionTypes.CREATE_SLIDE: {
			state.addNewSlide();
         return state
		}
		// case actionTypes.SELECT_SLIDE: {

		// 	return {
		// 		...state,
		// 		slides: [...state.slides].map((slide) => {
		// 			if (slide.id === action.payload) {
		// 				return { ...slide, active: true };
		// 			} else {
		// 				return { ...slide, active: false };
		// 			}
		// 		}),
		// 	};
		// }
		// case actionTypes.UPDATE_SLIDE: {
		// 	return {
		// 		...state,
		// 		slides: [...state.slides].map((slide) => {
		// 			if (slide.id === action.payload.id) {
		// 				return {
		// 					...action.payload,
		// 				};
		// 			} else {
		// 				return slide;
		// 			}
		// 		}),
		// 	};
		// }
		// case actionTypes.DELETE_SLIDE: {
		// 	let filteredSlides = [...state.slides].filter(
		// 		(slide) => slide.id !== action.payload.slideID
		// 	);
		// 	if (filteredSlides.length) {
		// 		if (filteredSlides[action.payload.slideIndex]) {
		// 			filteredSlides[action.payload.slideIndex].active = true;
		// 		} else {
		// 			filteredSlides[action.payload.slideIndex - 1].active = true;
		// 		}
		// 		return {
		// 			...state,
		// 			slides: filteredSlides,
		// 		};
		// 	} else {
		// 		return {
		// 			...state,
		// 			slides: filteredSlides,
		// 		};
		// 	}
		// }
		// case actionTypes.COPY_ELEMENT: {
		// 	return {
		// 		...state,
		// 		copiedElement: action.payload,
		// 	};
		// }
		// case actionTypes.PASTE_SLIDE: {
		// 	if (state.copiedElement == null) return state;
		// 	return {
		// 		...state,
		// 		slides: [
		// 			...state.slides.map((slide) => {
		// 				return { ...slide, active: false };
		// 			}),
		// 			{
		// 				...(state.copiedElement as slide),
		// 				id:
		// 					Date.now().toString(36) +
		// 					Math.random().toString(36).substr(2),
		// 				active: true,
		// 			},
		// 		],
		// 	};
		// }
		// case actionTypes.PASTE_ELEMENT: {
		// 	if (
		// 		state.copiedElement == null ||
		// 		(state.copiedElement as slideElement).content.length === 0
		// 	)
		// 		return state;
		// 	return {
		// 		...state,
		// 		slides: [
		// 			...state.slides.map((slide) => {
		// 				if (slide.active) {
		// 					return {
		// 						...slide,
		// 						elements: [
		// 							...slide.elements,
		// 							{
		// 								...(state.copiedElement as slideElement),
		// 								id:
		// 									Date.now().toString(36) +
		// 									Math.random()
		// 										.toString(36)
		// 										.substr(2),
		// 								position: {
		// 									top:
		// 										15 +
		// 										slide.elements.length * 0.2 +
		// 										"%",
		// 									left:
		// 										5 +
		// 										slide.elements.length * 0.2 +
		// 										"%",
		// 								},
		// 							},
		// 						],
		// 					};
		// 				} else {
		// 					return slide;
		// 				}
		// 			}),
		// 		],
		// 	};
		// }
		default: {
			return state;
		}
	}
};
