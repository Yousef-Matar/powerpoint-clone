import { slideElementType } from "../constants/SlideElementTypes.enum";
import Drawable from "./Drawable";

class SlideElement extends Drawable implements ISlideElement {
	private _id: Readonly<string>;
	content: string;
	type: slideElementType;
	constructor(slideElement?: Partial<ISlideElement>) {
		super(slideElement?.position, slideElement?.size);
		this._id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this.content = slideElement?.content || "";
		this.type = slideElement?.type || slideElementType.text;
	}
	get id(): Readonly<string> {
		return this._id;
	}
}
export default SlideElement;
