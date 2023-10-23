import Drawable from "./Drawable";

class SlideElement extends Drawable {
	id: Readonly<string>;
	content: string;
	constructor(props: SlideElementProps) {
		super(props.drawableProps);
		this.id =
			Date.now().toString(36) + Math.random().toString(36).substr(2);
		this.content = props.content || "";
	}
}
export default SlideElement;
