export {};
declare global {
	type Nullable<T> = T | null;
	interface IElementPosition {
		top: string;
		left: string;
	}
	interface IElementSize {
		width: number;
		height: number;
	}
	type SlideElementProps = {
		content?: string;
		drawableProps?: drawableProps;
	};
	type drawableProps = {
		position?: IElementPosition;
		size?: IElementSize;
	};
	type slide = {
		id: string;
		elements: slideElement[];
	};
	type slideElement = {
		id: string;
		content: string;
		position: IElementPosition;
		size: IElementSize;
	};

	// type NavTab = {
	// 	text: string;
	// 	visible: boolean;
	// };
	// type slide = {
	// 	id: string;
	// 	active: boolean;
	// 	elements: slideElement[];
	// };
	// type slideElement = {
	// 	id: string;
	// 	type: string;
	// 	content: string;
	// 	position: {
	// 		top: string;
	// 		left: string;
	// 	};
	// };
	// interface slideInterface {
	// 	slideID: string;
	// 	field: string;
	// 	value: string;
	// }
	// interface storeInterface {
	// 	copiedElement: Nullable<slideElement|slide>;
	// 	slides: Array<slide>;
	// }
}
