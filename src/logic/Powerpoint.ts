import { cloneDeep } from "lodash";
import Slide from "./Slide";
import SlideElement from "./SlideElement";
class Powerpoint implements IPowerpoint {
	private static _powerpoint: Nullable<IPowerpoint> = null;
	private _slides: ISlide[];
	private _activeSlide: Nullable<ISlide>;
	private _copiedElement: Nullable<ISlide | ISlideElement>;
	private constructor() {
		this._slides = [];
		this._activeSlide = null;
		this._copiedElement = null;
	}
	static getInstance(): IPowerpoint {
		if (Powerpoint._powerpoint == null) {
			Powerpoint._powerpoint = new Powerpoint();
		}
		return Powerpoint._powerpoint;
	}
	addNewSlide(): void {
		this._slides.push(new Slide());
		this._activeSlide = this._slides[this._slides.length - 1];
	}
	deleteSlide(): void {
		let deletedSlide = this._activeSlide as ISlide;
		if (deletedSlide === this._copiedElement) this._copiedElement = null;
		if (this._slides.length > 1) {
			this._activeSlide = this._cycleArray(deletedSlide);
		} else {
			this._activeSlide = null;
		}
		this._slides.splice(this._slides.indexOf(deletedSlide), 1);
	}
	pasteElement(): void {
		if (this._copiedElement == null) return;
		if ((this._copiedElement as ISlide).elements != null) {
			this._slides.push(
				new Slide({ ...(this._copiedElement as ISlide) })
			);
			this._activeSlide = this._slides[this._slides.length - 1];
		} else if ((this._copiedElement as ISlideElement).content != null) {
			this._activeSlide?.elements.push(
				new SlideElement({ ...(this._copiedElement as ISlideElement) })
			);
		}
	}
	set activeSlide(slide: Nullable<ISlide>) {
		this._activeSlide = slide;
	}
	set copiedElement(selectedElement: ISlide | ISlideElement) {
		this._copiedElement = cloneDeep(selectedElement);
	}
	get activeSlide(): Readonly<Nullable<ISlide>> {
		return this._activeSlide;
	}
	get slides(): Readonly<ISlide[]> {
		return this._slides;
	}
	private _cycleArray(slide: ISlide): Nullable<ISlide> {
		const index = this._slides.indexOf(slide);
		if (index === -1) return null;
		return this._slides[(index + 1) % this._slides.length];
	}
}
export default Powerpoint;
