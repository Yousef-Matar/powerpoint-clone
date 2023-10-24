class Slide implements ISlide {
	id: Readonly<string>;
	private _elements: ISlideElement[];
	private _selectedElement: Nullable<ISlideElement> = null;
	constructor(slide?: ISlide) {
		this.id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this._elements = slide?.elements || [];
	}
	addElement(slideElement: ISlideElement): void {
		this._elements.push(slideElement);
		this._selectedElement = slideElement;
	}
	addElements(slideElements: ISlideElement[]): void {
		this._elements.push(...slideElements);
		this._selectedElement = this._elements[this._elements.length - 1];
	}
	removeElement(element: ISlideElement): void {
		if (element === this._selectedElement) {
			this._selectedElement = null;
		}
		this._elements.splice(this._elements.indexOf(element), 1);
	}
	updateElement(slideElement:ISlideElement): void {
		if (this._selectedElement == null) return;
		this._selectedElement = Object.assign(this._selectedElement, slideElement);
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
}
export default Slide;
