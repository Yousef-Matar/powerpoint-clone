class Slide implements ISlide {
	id: Readonly<string>;
	private _elements: ISlideElement[];
	constructor(slide?: ISlide) {
		this.id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this._elements = slide?.elements || [];
	}
	addElement(slideElement: ISlideElement): void {
		this._elements.push(slideElement);
	}
	addElements(slideElements: ISlideElement[]): void {
		this._elements.push(...slideElements);
	}
	removeElement(element: ISlideElement): void {
		this._elements.splice(this._elements.indexOf(element), 1);
	}
	updateElement(oldElement: ISlideElement, newElement: ISlideElement): void {
		this._elements.splice(
			this._elements.indexOf(oldElement),
			1,
			newElement
		);
	}
	get elements(): ISlideElement[] {
		return this._elements;
	}
}
export default Slide;
