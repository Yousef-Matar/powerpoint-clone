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
		addNewSlide: Function;
		pasteSlide: Function;
		deleteSlide: Function;
	}
	interface ISlide {
		elements:ISlideElement[]
		addElement:Function
		addElements:Function
		removeElement:Function
		updateElement:Function
	}
	interface ISlideElement {
		content:string;
	}
}
