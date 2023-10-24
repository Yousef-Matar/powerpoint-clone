import Slide from "./Slide";
class Powerpoint implements IPowerpoint {
	private static _powerpoint: Nullable<IPowerpoint> = null;
	private _slides: ISlide[] = [];
	private _activeSlide: Nullable<ISlide> = null;
	private constructor() {}
	static getInstance(): IPowerpoint {
		if (Powerpoint._powerpoint == null)
			Powerpoint._powerpoint = new Powerpoint();

		return Powerpoint._powerpoint;
	}
	addNewSlide(): void {
		this._slides.push(new Slide());
		this._activeSlide = this._slides[this._slides.length - 1];
	}
	pasteSlide(slide: ISlide): void {
		this._slides.push(new Slide({...slide}));
		this._activeSlide = this._slides[this._slides.length - 1];
	}
	deleteSlide(slide: ISlide): void {
		this._activeSlide = this._cycleArray(slide);
		this._slides.splice(this._slides.indexOf(slide), 1);
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
	private _cycleArray(slide: ISlide): Nullable<ISlide> {
		const index = this._slides.indexOf(slide);
		if (index === -1) return null;
		return this._slides[(index + 1) % this._slides.length];
	}
}
export default Powerpoint;
