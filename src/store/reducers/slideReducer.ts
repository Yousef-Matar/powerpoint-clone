import * as actionTypes from "../actionTypes/actionTypes";

const initialState: slidesInterface = {
	slides: [
		{
			id: Date.now().toString(36) + Math.random().toString(36).substr(2),
			type: "text",
			header: "Slide 1",
			subHeader: "Sub Header",
			active: true,
		},
		{
			id: Date.now().toString(36) + Math.random().toString(36).substr(2),
			type: "text",
			header: "",
			subHeader: "",
			active: false,
		},
	],
};

interface createAction {
	type: typeof actionTypes.CREATE_SLIDE;
	payload: string;
}
interface selectAction {
	type: typeof actionTypes.SELECT_SLIDE;
	payload: string;
}
interface updateAction {
	type: typeof actionTypes.UPDATE_SLIDE;
	payload: slide;
}
export const slideReducer = (
	state = initialState,
	action: createAction | selectAction | updateAction
) => {
	switch (action.type) {
		case actionTypes.CREATE_SLIDE: {
			return {
				...state,
				slides: [
					...state.slides.map((slide) => {
						return { ...slide, active: false };
					}),
					{
						id:
							Date.now().toString(36) +
							Math.random().toString(36).substr(2),
						type: action.payload,
						header: "",
						subHeader: "",
						active: true,
					},
				],
			};
		}
		case actionTypes.SELECT_SLIDE: {
			return {
				...state,
				slides: [...state.slides].map((slide) => {
					if (slide.id === action.payload) {
						return { ...slide, active: true };
					} else {
						return { ...slide, active: false };
					}
				}),
			};
		}
		case actionTypes.UPDATE_SLIDE: {
			return {
				...state,
				slides: [...state.slides].map((slide) => {
					if (slide.id === action.payload.id) {
						return {
							...action.payload,
						};
					} else {
						return slide;
					}
				}),
			};
		}
		default: {
			return state;
		}
	}
};
