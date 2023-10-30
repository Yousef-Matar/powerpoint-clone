import SlideElement from "./SlideElement";

class Slide implements ISlide {
	private _id: Readonly<string>;
	private _elements: ISlideElement[];
	private _selectedElement: Nullable<ISlideElement> = null;
	constructor(slide?: ISlide) {
		this._id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this._elements = slide?.elements || [];
	}
	addElement(slideElement?: Partial<ISlideElement>): void {
		this._elements.push(new SlideElement(slideElement));
		this._selectedElement = this._elements[this._elements.length - 1];
	}
	removeElement(): void {
		if (this._selectedElement === null) return;
		if (
			this._selectedElement.content?.length &&
			this._selectedElement.type !== "image"
		) {
			this._selectedElement.content = "";
			return;
		}
		this._elements.splice(this._elements.indexOf(this._selectedElement), 1);
		this._selectedElement = null;
	}
	updateElement(slideElement: ISlideElement): void {
		if (this._selectedElement == null) return;
		this._selectedElement = Object.assign(
			this._selectedElement,
			slideElement
		);
		console.log(this._selectedElement)
		console.log(this._elements[0])
	}
	set selectedElement(ISlideElement: Nullable<ISlideElement>) {
		this._selectedElement = ISlideElement;
	}
	get selectedElement(): Nullable<ISlideElement> {
		return this._selectedElement;
	}
	get elements(): ISlideElement[] {
		return this._elements;
	}
	get id(): Readonly<string> {
		return this._id;
	}
}
export default Slide;
