class Slide {
	id: Readonly<string>;
	private _elements: slideElement[];
	constructor(slide?:slide) {
		this.id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this._elements = slide?.elements || [];
	}
	addElement(slideElement: slideElement): void {
		this._elements.push(slideElement);
	}
	addElements(slideElements: slideElement[]): void {
		this._elements.push(...slideElements);
	}
	removeElement(element: slideElement): void {
		this._elements.splice(this._elements.indexOf(element), 1);
	}
	updateElement(oldElement: slideElement, newElement: slideElement): void {
		this._elements.splice(
			this._elements.indexOf(oldElement),
			1,
			newElement
		);
	}
	get elements(): slideElement[] {
		return this._elements;
	}
}
export default Slide;
