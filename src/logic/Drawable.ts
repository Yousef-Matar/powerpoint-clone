class Drawable {
	position: IElementPosition;
	size: IElementSize;
	constructor(position?: IElementPosition, size?: IElementSize) {
		this.position = position || { top: "0%", left: "0%" };
		this.size = size || { width: 100, height: 50 };
	}
}
export default Drawable;
