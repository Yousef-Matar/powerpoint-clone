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
