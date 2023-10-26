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
				new SlideElement({
					...(this._copiedElement as ISlideElement),
					position: {
						top:
							(this._copiedElement as ISlideElement).position
								?.top ||
							5 + this._activeSlide?.elements.length * 0.2,
						left:
							(this._copiedElement as ISlideElement).position
								?.left ||
							5 + this._activeSlide?.elements.length * 0.2,
					},
				})
			);
		}
	}
	copyElement(selectedElementType: string) {
		if (selectedElementType === "slide") {
			this._copiedElement = cloneDeep(this._activeSlide);
		} else if (selectedElementType === "slideElement") {
			this._copiedElement = cloneDeep(
				this._activeSlide?.selectedElement || null
			);
		} else {
			this._copiedElement = null;
		}
	}
	set activeSlide(slide: Nullable<ISlide>) {
		this._activeSlide = slide;
	}
	get activeSlide(): Readonly<Nullable<ISlide>> {
		return this._activeSlide;
	}
	get slides(): Readonly<ISlide[]> {
		return this._slides;
	}
	private _cycleArray(slide: ISlide): ISlide {
		var index = this._slides.indexOf(slide);
		// the -2 is because the active slide is changed before deletion
		if ((index + 1) % this._slides.length === 0) {
			index = this._slides.length - 2;
		} else {
			index = (index + 1) % this._slides.length;
		}
		return this._slides[index];
	}
}
export default Powerpoint;
