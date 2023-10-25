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
	addElement(): void {
		this._elements.push(new SlideElement());
		this._selectedElement = this._elements[this._elements.length - 1];
	}
	removeElement(element: ISlideElement): void {
		if (element.id === this._selectedElement?.id) {
			this._selectedElement = null;
		}
		this._elements.splice(this._elements.indexOf(element), 1);
	}
	updateElement(slideElement: ISlideElement): void {
		if (this._selectedElement == null) return;
		this._selectedElement = Object.assign(
			this._selectedElement,
			slideElement
		);
	}
	set selectedElement(ISlideElement) {
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
