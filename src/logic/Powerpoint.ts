import Slide from "./Slide";
class Powerpoint {
	private _slides: slide[] = [];
	private _activeSlide: Nullable<slide> = null;

	addNewSlide(): void {
		this._slides.push(new Slide());
		this._activeSlide = this._slides[this._slides.length - 1];
	}
	copySlide(slide: slide): void {
		this._slides.push(slide);
		this._activeSlide = slide;
	}
	deleteSlide(slide: slide): void {
		this._activeSlide = this._cycleArray(slide);
		this._slides.splice(this._slides.indexOf(slide), 1);
	}
	set activeSlide(slide: Nullable<slide>) {
		this._activeSlide = slide;
	}
	get activeSlide(): Readonly<Nullable<slide>> {
		return this._activeSlide;
	}
	get slides(): Readonly<slide[]> {
		return this._slides;
	}
	private _cycleArray(slide: slide): Nullable<slide> {
		const index = this._slides.indexOf(slide);
		if (index === -1) return null;
		return this._slides[(index + 1) % this._slides.length];
	}
}
export default Powerpoint;
