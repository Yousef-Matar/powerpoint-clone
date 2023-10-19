export { };
declare global {
	type Nullable<T> = T | null;
	type NavTab = {
		text: string;
		visible: boolean;
	};
	type slide = {
		id: string;
		type: string;
		header: string;
		subHeader: string;
		active: boolean;
	};
	interface slideInterface {
		slideID: string;
		field: string;
		value: string;
	}
	interface slidesInterface {
		slides: slide[];
	}
}
