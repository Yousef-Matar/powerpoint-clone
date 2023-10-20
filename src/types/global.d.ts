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
		placeholder: string;
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
		copiedElement: Nullable<slide>;
		slides: slide[];
	}
}
