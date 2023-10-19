import React from "react";
import { useSelector } from "react-redux";
import SingleSlide from "../../../Slide/SingleSlide";

const SlideView = () => {
	const slides = useSelector<slidesInterface, slidesInterface["slides"]>(
		(state) => state.slides
	);

	return (
		<div className=" min-w-[60%] max-w-[80%] h-100 py-10 px-5 flex-grow">
			{slides.map(
				(slide, index) =>
					slide.active && (
						<SingleSlide
							key={index}
							slide={slide}
							navigation={false}
						/>
					)
			)}
		</div>
	);
};

export default SlideView;
