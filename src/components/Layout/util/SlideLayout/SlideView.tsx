import React from "react";
import { useSelector } from "react-redux";
import SingleSlide from "../../../Slide/SingleSlide";

const SlideView = () => {
	const slides = useSelector<slidesInterface, slidesInterface["slides"]>(
		(state) => state.slides
	);

	return (
		<div
			className=" min-w-[33.333333%] max-w-[66.666666%] h-100 py-10 px-5"
			style={{ width: "66.666666%" }}
		>
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
