import Drawable from "./Drawable";

class SlideElement extends Drawable{
	id: Readonly<string>;
	content: string;
	constructor(slideElement?: SlideElement) {
		super(slideElement?.position,slideElement?.size);
		this.id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this.content = slideElement?.content || "";
	}
}
export default SlideElement;
