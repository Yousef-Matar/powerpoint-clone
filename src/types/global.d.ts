export { };
declare global {
	type Nullable<T> = T | null;
	type NavTab = {
		text: string;
		visible: boolean;
	};
	type slide = {
		id: string;
		active: boolean;
		elements: slideElement[];
	};
	type slideElement = {
		id: string;
		type: string;
		content: string;
		position: {
			top: string;
			left: string;
		};
	};
	interface slideInterface {
		slideID: string;
		field: string;
		value: string;
	}
	interface storeInterface {
		copiedElement: Nullable<slideElement|slide>;
		slides: Array<slide>;
	}
}
