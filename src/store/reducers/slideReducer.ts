import * as actionTypes from "../actionTypes/actionTypes";

const initialState: storeInterface = {
	copiedElement: null,
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
interface copyAction {
	type: typeof actionTypes.COPY_ELEMENT;
	payload: slide;
}
interface pasteSlideAction {
	type: typeof actionTypes.PASTE_SLIDE;
}
export const slideReducer = (
	state = initialState,
	action:
		| createAction
		| selectAction
		| updateAction
		| copyAction
		| pasteSlideAction
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
		case actionTypes.COPY_ELEMENT: {
			return {
				...state,
				copiedElement: action.payload,
			};
		}
		case actionTypes.PASTE_SLIDE: {
			if (state.copiedElement != null) {
				return {
					...state,
					slides: [
						...state.slides.map((slide) => {
							return { ...slide, active: false };
						}),
						{
							...state.copiedElement,
							id:
								Date.now().toString(36) +
								Math.random().toString(36).substr(2),
							active: true,
						},
					],
				};
			} else {
				return state;
			}
		}
		default: {
			return state;
		}
	}
};
