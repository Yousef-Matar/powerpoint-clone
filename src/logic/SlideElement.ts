import Drawable from "./Drawable";

class SlideElement extends Drawable implements ISlideElement {
	private _id: Readonly<string>;
	content: string;
	type: string;
	constructor(slideElement?: Partial<ISlideElement>) {
		super(slideElement?.position, slideElement?.size);
		this._id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this.content = slideElement?.content || "";
		this.type = slideElement?.type || "text";
	}
	get id(): Readonly<string> {
		return this._id;
	}
}
export default SlideElement;
