import * as actionTypes from "../actionTypes/actionTypes";

const initialState: slidesInterface = {
	slides: [
		{
			id: Date.now().toString(36) + Math.random().toString(36).substr(2),
			active: true,
			elements: [
				{
					id:
						Date.now().toString(36) +
						Math.random().toString(36).substr(2),
					type: "title",
					content: "<div>Slide 1</div>",
					placeholder: "<div>Click to add title</div>",
					position: {
						top: "20%",
						left: "5%",
					},
				},
				{
					id:
						Date.now().toString(36) +
						Math.random().toString(36).substr(2),
					type: "subtitle",
					content: "<div>Sub title</div>",
					placeholder: "<div>Click to add subtitle</div>",
					position: {
						top: "50%",
						left: "5%",
					},
				},
			],
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
	action: createAction | selectAction|updateAction
) => {
	switch (action.type) {
		case actionTypes.CREATE_SLIDE: {
			switch (action.payload) {
				case "text": {
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
								active: true,
								elements: [
									{
										id:
											Date.now().toString(36) +
											Math.random()
												.toString(36)
												.substr(2),
										type: "title",
										content: "",
										placeholder:
											"<div>Click to add title</div>",
										position: {
											top: "20%",
											left: "5%",
										},
									},
									{
										id:
											Date.now().toString(36) +
											Math.random()
												.toString(36)
												.substr(2),
										type: "subtitle",
										content: "",
										placeholder:
											"<div>Click to add subtitle</div>",
										position: {
											top: "50%",
											left: "5%",
										},
									},
								],
							},
						],
					};
				}
				default: {
					return state;
				}
			}
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
