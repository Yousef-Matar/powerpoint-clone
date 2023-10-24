export { };
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
	interface IPowerpoint {
		slides: Readonly<slide[]>;
		addNewSlide: Function;
		copySlide: Function;
		deleteSlide: Function;
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
}
