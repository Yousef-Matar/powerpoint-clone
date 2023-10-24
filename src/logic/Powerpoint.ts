import Slide from "./Slide";
class Powerpoint {
	private static _powerpoint: Nullable<Powerpoint> = null;
	private _slides: Slide[] = [];
	private _activeSlide: Nullable<Slide> = null;
	private constructor() {}
	static getInstance(): Powerpoint {
		if (Powerpoint._powerpoint == null)
			Powerpoint._powerpoint = new Powerpoint();

		return Powerpoint._powerpoint;
	}
	addNewSlide(): void {
		this._slides.push(new Slide());
		this._activeSlide = this._slides[this._slides.length - 1];
	}
	copySlide(slide: Slide): void {
		this._slides.push(new Slide(slide));
		this._activeSlide = this._slides[this._slides.length - 1];
	}
	deleteSlide(slide: Slide): void {
		this._activeSlide = this._cycleArray(slide);
		this._slides.splice(this._slides.indexOf(slide), 1);
	}
	set activeSlide(slide: Nullable<Slide>) {
		this._activeSlide = slide;
	}
	get activeSlide(): Readonly<Nullable<Slide>> {
		return this._activeSlide;
	}
	get slides(): Readonly<Slide[]> {
		return this._slides;
	}
	private _cycleArray(slide: Slide): Nullable<Slide> {
		const index = this._slides.indexOf(slide);
		if (index === -1) return null;
		return this._slides[(index + 1) % this._slides.length];
	}
}
export default Powerpoint;
