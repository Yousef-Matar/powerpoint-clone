export { };
declare global {
	type Nullable<T> = T | null;
	type NavTab = {
		text: string;
		visible: boolean;
	};
	interface slide {
		id: string;
		type: string;
		header: Nullable<string>;
		subHeader: Nullable<string>;
		active: boolean;
	}
	interface slidesInterface {
		slides: slide[];
	}
}
