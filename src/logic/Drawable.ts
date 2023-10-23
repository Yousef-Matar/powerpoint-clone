
type drawableProps = {
	position?: IElementPosition;
	size?: IElementSize;
};
class Drawable {
	position: IElementPosition;
	size: IElementSize;
	constructor(props?: drawableProps) {
		this.position = props?.position || { top: "0", left: "0" };
		this.size = props?.size || { width: 100, height: 50 };
	}
}
export default Drawable;
