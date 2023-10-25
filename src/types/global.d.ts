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
		slides: Readonly<ISlide[]>;
		activeSlide: Nullable<ISlide>;
		copyElement: Function;
		addNewSlide: Function;
		deleteSlide: Function;
		pasteElement: Function;
	}
	interface ISlide {
		id: Readonly<string>;
		elements: ISlideElement[];
		selectedElement: Nullable<ISlideElement>;
		addElement: Function;
		removeElement: Function;
		updateElement: Function;
	}
	interface ISlideElement {
		id: Readonly<string>;
		content?: string;
		position?: IElementPosition;
		size?: IElementSize;
	}
}
