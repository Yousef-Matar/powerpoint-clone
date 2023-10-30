class Drawable {
	position: IElementPosition;
	size: IElementSize;
	constructor(position?: IElementPosition, size?: IElementSize) {
		this.position = position || { top: 5, left: 5, zIndex: 1 };
		this.size = size || { width: 90, height: 10 };
	}
}
export default Drawable;
