import { CREATE_SLIDE, SELECT_SLIDE } from "../actionTypes/actionTypes";

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
			header: null,
			subHeader: null,
			active: false,
		},
	],
};

interface createAction {
	type: typeof CREATE_SLIDE;
	payload: string;
}
interface selectAction {
	type: typeof SELECT_SLIDE;
	payload: string;
}
export const slideReducer = (
	state = initialState,
	action: createAction | selectAction
) => {
	switch (action.type) {
		case CREATE_SLIDE: {
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
						header: null,
						subHeader: null,
						active: true,
					},
				],
			};
		}
		case SELECT_SLIDE: {
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
		default: {
			return state;
		}
	}
};
