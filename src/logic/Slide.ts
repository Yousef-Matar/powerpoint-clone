import SlideElement from "./SlideElement";

class Slide {
	id: Readonly<string>;
	private _elements: SlideElement[];
	constructor(slide?:Slide) {
		this.id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this._elements = slide?.elements || [];
	}
	addElement(slideElement: SlideElement): void {
		this._elements.push(slideElement);
	}
	addElements(slideElements: SlideElement[]): void {
		this._elements.push(...slideElements);
	}
	removeElement(element: SlideElement): void {
		this._elements.splice(this._elements.indexOf(element), 1);
	}
	updateElement(oldElement: SlideElement, newElement: SlideElement): void {
		this._elements.splice(
			this._elements.indexOf(oldElement),
			1,
			newElement
		);
	}
	get elements(): SlideElement[] {
		return this._elements;
	}
}
export default Slide;
